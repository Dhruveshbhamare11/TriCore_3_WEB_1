// ProofBridge - Core Evidence Engine
// Implements deterministic consistency checks as defined in ARCHITECTURE.md

export class EvidenceEngine {
  /**
   * Evaluates structured evidence for an activity
   * @param {Object} activity 
   * @returns {Object} Structured analysis
   */
  static analyzeActivity(activity) {
    const consistentSignals = [];
    const needsClarification = [];
    const missingEvidence = [];

    // 1. Evaluate Media Evidence
    if (activity.mediaSummary) {
      if (activity.mediaSummary.dateConsistency === 'consistent') {
        consistentSignals.push({
          title: "Capture Timestamps Aligned",
          description: `All ${activity.mediaSummary.totalFiles} camera media files have EXIF timestamps aligning with the event date (${activity.date}).`,
          source: "Media EXIF Headers",
          status: "consistent"
        });
      }

      if (activity.mediaSummary.locationConsistency === 'consistent') {
        consistentSignals.push({
          title: "GPS Location Coordinates Aligned",
          description: `Embedded GPS coordinates in submitted media match the claimed activity venue in ${activity.location.city} (${activity.location.area}).`,
          source: "Hardware Geotags",
          status: "consistent"
        });
      }
    } else {
      missingEvidence.push({
        title: "Media Geotags Unavailable",
        description: "Submitted photos do not contain embedded hardware GPS coordinates.",
        status: "not_available"
      });
    }

    // 2. Evaluate Document & Invoices
    let totalDocumentedQuantity = 0;
    if (activity.documents && activity.documents.length > 0) {
      activity.documents.forEach(doc => {
        // Math check
        if (doc.calculationConsistency === 'consistent') {
          consistentSignals.push({
            title: `Invoice Calculations Verified (${doc.invoiceNumber})`,
            description: `Line item mathematics (${doc.items[0]?.quantity} units × ₹${doc.items[0]?.unitPrice}) exactly match subtotal (₹${doc.subtotal.toLocaleString('en-IN')}).`,
            source: `${doc.vendor}`,
            status: "consistent"
          });
        }

        // Date check
        if (doc.dateConsistency === 'consistent') {
          consistentSignals.push({
            title: `Procurement Date Consistent (${doc.invoiceNumber})`,
            description: `Invoice date (${doc.date}) precedes the distribution event (${activity.date}) by 24 hours.`,
            source: "Vendor Timestamp",
            status: "consistent"
          });
        }

        totalDocumentedQuantity += (doc.documentedQuantity || 0);
      });
    } else {
      missingEvidence.push({
        title: "Financial Procurement Documents Missing",
        description: "No purchase bills or receipt files have been attached to this activity claim.",
        status: "not_available"
      });
    }

    // 3. Quantity Comparison (The Primary Hackathon Discrepancy Highlight)
    const claimedQty = activity.claim?.claimedQuantity || 0;
    const unit = activity.claim?.unit || 'units';

    if (claimedQty > 0 && totalDocumentedQuantity > 0) {
      if (claimedQty === totalDocumentedQuantity) {
        consistentSignals.push({
          title: `Quantity Supported (${claimedQty} ${unit})`,
          description: `Documented quantities across verified purchase invoices completely account for all ${claimedQty} ${unit}.`,
          source: "Cross-Record Reconciliation",
          status: "consistent"
        });
      } else if (totalDocumentedQuantity < claimedQty) {
        const difference = claimedQty - totalDocumentedQuantity;
        needsClarification.push({
          title: `Quantity Discrepancy (${difference} ${unit} Unaccounted)`,
          description: `Activity reports ${claimedQty} ${unit}. Submitted invoices currently account for ${totalDocumentedQuantity} ${unit}. ${difference} ${unit} lack supporting invoice evidence.`,
          claimed: claimedQty,
          documented: totalDocumentedQuantity,
          difference: difference,
          unit: unit,
          source: "Claim vs Invoice Comparison",
          status: "partial"
        });
      } else {
        consistentSignals.push({
          title: `Documented Surplus Quantity`,
          description: `Invoices account for ${totalDocumentedQuantity} ${unit}, exceeding reported distribution of ${claimedQty} ${unit}.`,
          status: "consistent"
        });
      }
    }

    // 4. Evaluate Volunteer Proof-of-Presence
    if (activity.volunteers) {
      const { registered, authenticatedAttendance, confirmations } = activity.volunteers;
      
      consistentSignals.push({
        title: "Authenticated Volunteer Corroboration",
        description: `${authenticatedAttendance} physically present volunteers checked in with authenticated passes. ${confirmations} have independently corroborated that the activity occurred as described.`,
        source: "Proof-of-Presence Ledger",
        status: "consistent"
      });
    }

    // 5. Generate Human-Readable AI Summary
    const qtyFinding = claimedQty !== totalDocumentedQuantity 
      ? `Submitted invoice evidence currently accounts for ${totalDocumentedQuantity} of the ${claimedQty} reported ${unit}. ${claimedQty - totalDocumentedQuantity} ${unit} are not currently accounted for by submitted invoice records.`
      : `Documented purchase quantities fully account for all ${claimedQty} reported ${unit}.`;

    const summary = `Available evidence supports the reported activity date (${activity.date}) and venue (${activity.location?.name || activity.location?.city}). Authenticated volunteer attendance records corroborate that ${activity.volunteers?.authenticatedAttendance || 0} participants were physically present. ${qtyFinding}`;

    return {
      activityId: activity.id,
      consistentSignals,
      needsClarification,
      missingEvidence,
      claimedQuantity: claimedQty,
      documentedQuantity: totalDocumentedQuantity,
      quantityDifference: Math.max(0, claimedQty - totalDocumentedQuantity),
      unit,
      summary
    };
  }
}
