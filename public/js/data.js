// ProofBridge - Structured Seed Data Store
// Primary Demo NGO: Udaan Foundation (Education, Mumbai)

export const INITIAL_DATA = {
  ngos: [
    {
      id: "ngo_udaan",
      name: "Udaan Foundation",
      slug: "udaan-foundation",
      tagline: "Empowering underprivileged children through quality education & school kits in urban Mumbai.",
      category: "Education",
      city: "Mumbai",
      state: "Maharashtra",
      founded: "2014",
      logo: "🎒",
      coverImage: "/assets/school_kit_distribution.jpg",
      identity: {
        darpanId: "MH/2021/0298412",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "BOM/1982/1042 (Societies Registration Act XXI of 1860)",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Not Applicable",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 14,
        volunteers: 142,
        volunteerHours: 820,
        fundsRaised: 418000
      },
      featuredActivityId: "act_school_kits",
      activities: [
        {
          id: "act_school_kits",
          title: "School Kit Distribution Drive",
          cause: "Education",
          date: "September 24, 2026",
          formattedDate: "24 Sep 2026",
          location: {
            name: "Dharavi Municipal School #4",
            area: "Dharavi",
            city: "Mumbai",
            latitude: 19.0402,
            longitude: 72.8508
          },
          heroImage: "/assets/school_kit_distribution.jpg",
          claim: {
            description: "250 school kits distributed to students in Dharavi",
            metric: "school kits",
            claimedQuantity: 250,
            unit: "kits"
          },
          media: [
            {
              id: "med_1",
              type: "photo",
              url: "/assets/school_kit_distribution.jpg",
              caption: "Classroom distribution session with volunteer assistance",
              exifDate: "2026-09-24T09:42:00",
              device: "Sony Alpha A7 IV",
              gpsAvailable: true,
              gpsCoordinates: "19.0402° N, 72.8508° E",
              status: "consistent"
            },
            {
              id: "med_2",
              type: "photo",
              url: "/assets/school_kit_distribution.jpg",
              caption: "Kit verification and kit contents handover",
              exifDate: "2026-09-24T10:15:00",
              device: "iPhone 15 Pro",
              gpsAvailable: true,
              gpsCoordinates: "19.0405° N, 72.8510° E",
              status: "consistent"
            }
          ],
          mediaSummary: {
            totalFiles: 8,
            dateConsistency: "consistent",
            locationConsistency: "consistent",
            provenanceNotes: "8 original camera RAW/JPEG files submitted with preserved EXIF headers."
          },
          documents: [
            {
              id: "doc_inv_4821",
              type: "Invoice",
              title: "Educational Materials Purchase Invoice",
              fileName: "ABC_Edu_Supplies_INV-4821.pdf",
              vendor: "ABC Educational Supplies Pvt Ltd",
              invoiceNumber: "INV-4821",
              date: "September 23, 2026",
              gstin: "27AABCA1234F1Z8",
              items: [
                {
                  description: "Standard School Kit Pack (Bag, 6 Notebooks, Geometry Box, Pen Set)",
                  quantity: 220,
                  unitPrice: 660,
                  amount: 145200
                }
              ],
              subtotal: 145200,
              tax: 0,
              total: 145200,
              documentedQuantity: 220,
              calculationConsistency: "consistent",
              dateConsistency: "consistent",
              quantityStatus: "partial" // 220 kits documented vs 250 claimed!
            }
          ],
          volunteers: {
            registered: 25,
            authenticatedAttendance: 17, // Will increment to 18 on demo check-in!
            confirmations: 14,
            witnessStatus: "14 of 17 authenticated participants independently confirmed activity took place."
          },
          fundraiserId: "fund_school_kits"
        }
      ],
      fundraisers: [
        {
          id: "fund_school_kits",
          title: "Help provide another 100 school kits",
          description: "Fund educational backpacks, notebooks, and learning supplies for children in municipal schools.",
          targetAmount: 80000,
          raisedAmount: 62400,
          percentage: 78,
          unitEquivalent: "₹800 ≈ one complete school kit with stationery",
          expenditures: [
            { category: "Kit Bags & Textbooks", amount: 48400, invoiceRef: "INV-4821" },
            { category: "Logistics & Transport", amount: 8200, receiptRef: "REC-904" },
            { category: "Stationery Packs", amount: 5800, invoiceRef: "INV-4822" }
          ]
        }
      ],
      opportunities: [
        {
          id: "opp_1",
          title: "Youth Literacy & Book Sorting Drive",
          date: "October 12, 2026",
          time: "09:00 AM – 01:00 PM",
          location: "Dharavi Community Center, Mumbai",
          slotsTotal: 30,
          slotsFilled: 22,
          cause: "Education",
          hours: 4
        },
        {
          id: "opp_2",
          title: "Community Math Tutoring Workshop",
          date: "October 18, 2026",
          time: "10:00 AM – 02:00 PM",
          location: "Sion Municipal High School, Mumbai",
          slotsTotal: 20,
          slotsFilled: 15,
          cause: "Education",
          hours: 4
        }
      ]
    },
    {
      id: "ngo_vriksha",
      name: "Vriksha Trust",
      slug: "vriksha-trust",
      tagline: "Urban afforestation and indigenous sapling plantation across Maharashtra watersheds.",
      category: "Environment",
      city: "Pune",
      state: "Maharashtra",
      founded: "2017",
      logo: "🌱",
      coverImage: "/assets/tree_plantation_activity.jpg",
      identity: {
        darpanId: "MH/2019/0149201",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "MAH/741/2017",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Available",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 9,
        volunteers: 88,
        volunteerHours: 540,
        fundsRaised: 285000
      },
      featuredActivityId: "act_tree_plant",
      activities: [
        {
          id: "act_tree_plant",
          title: "1,000 Miyawaki Sapling Plantation",
          cause: "Environment",
          date: "August 15, 2026",
          formattedDate: "15 Aug 2026",
          location: {
            name: "Vetal Hill Biodiversity Reserve",
            area: "Kothrud",
            city: "Pune",
            latitude: 18.5196,
            longitude: 73.8153
          },
          heroImage: "/assets/tree_plantation_activity.jpg",
          claim: {
            description: "1,000 indigenous saplings planted on urban hill slope",
            metric: "saplings",
            claimedQuantity: 1000,
            unit: "saplings"
          },
          volunteers: {
            registered: 35,
            authenticatedAttendance: 32,
            confirmations: 30
          }
        }
      ],
      fundraisers: [
        {
          id: "fund_trees",
          title: "Protect Urban Miyawaki Green Belt",
          description: "Funding drip irrigation and organic soil prep for 1,000 newly planted trees.",
          targetAmount: 50000,
          raisedAmount: 39000,
          percentage: 78,
          unitEquivalent: "₹50 ≈ one indigenous tree sapling nurtured"
        }
      ],
      opportunities: [
        {
          id: "opp_tree_1",
          title: "Weekend Sapling Mulching Drive",
          date: "October 19, 2026",
          time: "07:00 AM – 11:00 AM",
          location: "Vetal Hill, Pune",
          slotsTotal: 25,
          slotsFilled: 19,
          cause: "Environment",
          hours: 4
        }
      ]
    },
    {
      id: "ngo_aarogya",
      name: "Aarogya Seva Foundation",
      slug: "aarogya-seva",
      tagline: "Community kitchens and nutritious meal distribution for marginalized patients & families.",
      category: "Health",
      city: "Mumbai",
      state: "Maharashtra",
      founded: "2019",
      logo: "🍱",
      coverImage: "/assets/food_relief_distribution.jpg",
      identity: {
        darpanId: "MH/2020/0219482",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "MUM/882/2019",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Not Applicable",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 11,
        volunteers: 116,
        volunteerHours: 710,
        fundsRaised: 360000
      },
      featuredActivityId: "act_nutrition_meals",
      activities: [
        {
          id: "act_nutrition_meals",
          title: "Daily Hot Meals for Caregivers",
          cause: "Health",
          date: "September 28, 2026",
          formattedDate: "28 Sep 2026",
          location: {
            name: "Sion Hospital Shelter",
            area: "Sion",
            city: "Mumbai",
            latitude: 19.0330,
            longitude: 72.8590
          },
          heroImage: "/assets/food_relief_distribution.jpg",
          claim: {
            description: "500 cooked nutritious meal boxes distributed to hospital attendants",
            metric: "meal boxes",
            claimedQuantity: 500,
            unit: "boxes"
          },
          volunteers: {
            registered: 20,
            authenticatedAttendance: 16,
            confirmations: 15
          }
        }
      ],
      fundraisers: [
        {
          id: "fund_meals",
          title: "Nutritious Food Relief for 500 Families",
          description: "Providing wholesome khichdi, dal, and fruit packs to attendants waiting outside public hospitals.",
          targetAmount: 60000,
          raisedAmount: 51200,
          percentage: 85,
          unitEquivalent: "₹40 ≈ one wholesome packed meal"
        }
      ],
      opportunities: [
        {
          id: "opp_meal_1",
          title: "Meal Packaging & Dispatch Shift",
          date: "October 14, 2026",
          time: "06:30 AM – 10:30 AM",
          location: "Central Kitchen, Sion, Mumbai",
          slotsTotal: 15,
          slotsFilled: 11,
          cause: "Health",
          hours: 4
        }
      ]
    },
    {
      id: "ngo_jan_kalyan",
      name: "Jan Kalyan Samiti",
      slug: "jan-kalyan-samiti",
      tagline: "Rapid disaster relief, clean drinking water, and flood recovery kits in coastal districts.",
      category: "Disaster Relief",
      city: "Ratnagiri",
      state: "Maharashtra",
      founded: "2016",
      logo: "🛡️",
      coverImage: "/assets/food_relief_distribution.jpg",
      identity: {
        darpanId: "MH/2022/0381920",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "RTG/412/2016",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Available",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 6,
        volunteers: 64,
        volunteerHours: 390,
        fundsRaised: 195000
      },
      featuredActivityId: "act_flood_relief",
      activities: [
        {
          id: "act_flood_relief",
          title: "Monsoon Flood Water Purification Drive",
          cause: "Disaster Relief",
          date: "July 22, 2026",
          formattedDate: "22 Jul 2026",
          location: {
            name: "Chiplun Relief Camp",
            area: "Chiplun",
            city: "Ratnagiri",
            latitude: 17.5323,
            longitude: 73.5186
          },
          heroImage: "/assets/food_relief_distribution.jpg",
          claim: {
            description: "300 water filtration packs distributed to flood-affected households",
            metric: "filtration packs",
            claimedQuantity: 300,
            unit: "packs"
          },
          volunteers: {
            registered: 18,
            authenticatedAttendance: 14,
            confirmations: 12
          }
        }
      ],
      fundraisers: [
        {
          id: "fund_water",
          title: "Emergency Monsoon Clean Water Units",
          description: "Portable gravity filters for households impacted by seasonal river flooding.",
          targetAmount: 75000,
          raisedAmount: 58000,
          percentage: 77,
          unitEquivalent: "₹250 ≈ clean water filter kit"
        }
      ],
      opportunities: [
        {
          id: "opp_flood_1",
          title: "Relief Kit Sorting & Dispatch",
          date: "October 20, 2026",
          time: "08:00 AM – 12:00 PM",
          location: "Warehouse, Chiplun",
          slotsTotal: 20,
          slotsFilled: 14,
          cause: "Disaster Relief",
          hours: 4
        }
      ]
    },
    {
      id: "ngo_vidya_jyoti",
      name: "Vidya Jyoti Initiative",
      slug: "vidya-jyoti",
      tagline: "Bridging the digital divide with refurbished computer labs and STEM kits for government schools.",
      category: "Education",
      city: "Bengaluru",
      state: "Karnataka",
      founded: "2018",
      logo: "💻",
      coverImage: "/assets/school_kit_distribution.jpg",
      identity: {
        darpanId: "KA/2018/0091823",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "BLR/619/2018",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Not Applicable",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 8,
        volunteers: 72,
        volunteerHours: 460,
        fundsRaised: 310000
      },
      featuredActivityId: "act_stem_kits",
      activities: [
        {
          id: "act_stem_kits",
          title: "Solar STEM Science Box Handover",
          cause: "Education",
          date: "September 10, 2026",
          formattedDate: "10 Sep 2026",
          location: {
            name: "Govt Primary School",
            area: "Peenya",
            city: "Bengaluru",
            latitude: 13.0285,
            longitude: 77.5197
          },
          heroImage: "/assets/school_kit_distribution.jpg",
          claim: {
            description: "150 Solar STEM Experiment Kits installed in school laboratories",
            metric: "STEM kits",
            claimedQuantity: 150,
            unit: "kits"
          },
          volunteers: {
            registered: 15,
            authenticatedAttendance: 12,
            confirmations: 11
          }
        }
      ],
      fundraisers: [
        {
          id: "fund_stem",
          title: "Refurbish 25 Laptops for Peenya School Lab",
          description: "Equipping underprivileged 8th graders with practical computing labs.",
          targetAmount: 90000,
          raisedAmount: 72000,
          percentage: 80,
          unitEquivalent: "₹3,600 ≈ one refurbished student computer"
        }
      ],
      opportunities: [
        {
          id: "opp_stem_1",
          title: "Saturday Coding Tutor Session",
          date: "October 25, 2026",
          time: "10:00 AM – 01:00 PM",
          location: "Peenya School, Bengaluru",
          slotsTotal: 12,
          slotsFilled: 8,
          cause: "Education",
          hours: 3
        }
      ]
    },
    {
      id: "ngo_jeev_raksha",
      name: "Jeev Raksha Animal Trust",
      slug: "jeev-raksha",
      tagline: "Rescuing injured strays, anti-rabies vaccination drives, and humane animal welfare shelters in Mumbai.",
      category: "Animal Welfare",
      city: "Mumbai",
      state: "Maharashtra",
      founded: "2019",
      logo: "🐾",
      coverImage: "/assets/animal_rescue_shelter.jpg",
      identity: {
        darpanId: "MH/2021/0419283",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "MUM/719/2019",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Not Applicable",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 7,
        volunteers: 68,
        volunteerHours: 410,
        fundsRaised: 245000
      },
      featuredActivityId: "act_animal_rescue",
      activities: [
        {
          id: "act_animal_rescue",
          title: "Stray Animal Rescue & Vaccination Drive",
          cause: "Animal Welfare",
          date: "September 18, 2026",
          formattedDate: "18 Sep 2026",
          location: {
            name: "Aarey Forest Animal Rescue Shelter",
            area: "Goregaon East",
            city: "Mumbai",
            latitude: 19.1484,
            longitude: 72.8756
          },
          heroImage: "/assets/animal_rescue_shelter.jpg",
          claim: {
            description: "120 stray dogs vaccinated and 15 injured puppies treated",
            metric: "animals treated",
            claimedQuantity: 135,
            unit: "animals"
          },
          volunteers: {
            registered: 20,
            authenticatedAttendance: 18,
            confirmations: 16
          }
        }
      ],
      fundraisers: [
        {
          id: "fund_animal",
          title: "Critical Animal Rescue & Emergency Medical Care",
          description: "Sponsor anti-rabies vaccine vials, sterilizations, and nutritious puppy recovery food.",
          targetAmount: 55000,
          raisedAmount: 38500,
          percentage: 70,
          unitEquivalent: "₹350 ≈ one anti-rabies vaccine & deworming dose"
        }
      ],
      opportunities: [
        {
          id: "opp_animal_1",
          title: "Weekend Shelter Care & Feeding Shift",
          date: "October 15, 2026",
          time: "08:30 AM – 01:30 PM",
          location: "Aarey Rescue Center, Mumbai",
          slotsTotal: 25,
          slotsFilled: 14,
          cause: "Animal Welfare",
          hours: 5
        }
      ]
    },
    {
      id: "ngo_stree_shakti",
      name: "Stree Shakti Foundation",
      slug: "stree-shakti",
      tagline: "Vocational tailoring, artisanal handicrafts, and micro-livelihood training for self-reliant women.",
      category: "Women Empowerment",
      city: "Mumbai",
      state: "Maharashtra",
      founded: "2018",
      logo: "🪡",
      coverImage: "/assets/women_vocational_workshop.jpg",
      identity: {
        darpanId: "MH/2020/0182741",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "MUM/512/2018",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Available",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 10,
        volunteers: 94,
        volunteerHours: 580,
        fundsRaised: 340000
      },
      featuredActivityId: "act_women_tailoring",
      activities: [
        {
          id: "act_women_tailoring",
          title: "Sashakti Artisan Vocational Workshop",
          cause: "Women Empowerment",
          date: "September 20, 2026",
          formattedDate: "20 Sep 2026",
          location: {
            name: "Mahim Community Livelihood Center",
            area: "Mahim",
            city: "Mumbai",
            latitude: 19.0354,
            longitude: 72.8428
          },
          heroImage: "/assets/women_vocational_workshop.jpg",
          claim: {
            description: "45 women completed professional garment tailoring certification",
            metric: "certified artisans",
            claimedQuantity: 45,
            unit: "women"
          },
          volunteers: {
            registered: 15,
            authenticatedAttendance: 14,
            confirmations: 13
          }
        }
      ],
      fundraisers: [
        {
          id: "fund_women",
          title: "Micro-Enterprise Sewing Machine Toolkits",
          description: "Gifting durable sewing machines to graduating women artisans to start home businesses.",
          targetAmount: 65000,
          raisedAmount: 49000,
          percentage: 75,
          unitEquivalent: "₹6,500 ≈ one complete sewing machine & toolkit"
        }
      ],
      opportunities: [
        {
          id: "opp_women_1",
          title: "Artisan Mentorship & Accounting Support",
          date: "October 18, 2026",
          time: "10:00 AM – 03:00 PM",
          location: "Mahim Center, Mumbai",
          slotsTotal: 20,
          slotsFilled: 11,
          cause: "Women Empowerment",
          hours: 5
        }
      ]
    },
    {
      id: "ngo_gramin_vikas",
      name: "Gramin Vikas Sanstha",
      slug: "gramin-vikas",
      tagline: "Solar clean water kiosks, sanitation infrastructure, and sustainable rural community clusters.",
      category: "Community Development",
      city: "Thane",
      state: "Maharashtra",
      founded: "2015",
      logo: "💧",
      coverImage: "/assets/community_cleanwater_drive.jpg",
      identity: {
        darpanId: "MH/2019/0231940",
        darpanStatus: "matched",
        darpanUrl: "https://ngodarpan.gov.in/#/",
        registrationNumber: "THN/328/2015",
        registrationStatus: "matched",
        eightyGStatus: "Available & Active",
        fcraStatus: "Available",
        disclaimer: "DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."
      },
      stats: {
        activities: 12,
        volunteers: 110,
        volunteerHours: 720,
        fundsRaised: 490000
      },
      featuredActivityId: "act_clean_water",
      activities: [
        {
          id: "act_clean_water",
          title: "Jal Suraksha Solar Water Kiosk Handover",
          cause: "Community Development",
          date: "September 12, 2026",
          formattedDate: "12 Sep 2026",
          location: {
            name: "Murbad Watershed Community Hub",
            area: "Murbad",
            city: "Thane",
            latitude: 19.2564,
            longitude: 73.3986
          },
          heroImage: "/assets/community_cleanwater_drive.jpg",
          claim: {
            description: "5,000 liters/day pure water capacity commissioned for 400 rural households",
            metric: "households served",
            claimedQuantity: 400,
            unit: "households"
          },
          volunteers: {
            registered: 25,
            authenticatedAttendance: 22,
            confirmations: 20
          }
        }
      ],
      fundraisers: [
        {
          id: "fund_water_sanitation",
          title: "Solar Water Kiosk for 400 Rural Families",
          description: "Funding reverse osmosis filters and solar battery arrays for continuous clean drinking water.",
          targetAmount: 120000,
          raisedAmount: 88000,
          percentage: 73,
          unitEquivalent: "₹300 ≈ clean water access for 1 family for a year"
        }
      ],
      opportunities: [
        {
          id: "opp_water_1",
          title: "Community Water Testing & Volunteer Survey",
          date: "October 25, 2026",
          time: "09:00 AM – 02:00 PM",
          location: "Murbad Hub, Thane",
          slotsTotal: 30,
          slotsFilled: 17,
          cause: "Community Development",
          hours: 5
        }
      ]
    }
  ],
  userProfile: {
    id: "vol_10482",
    volunteerId: "V10482",
    name: "Dhruvesh Sharma",
    email: "dhruvesh@example.com",
    phone: "+91 98201 54321",
    authenticated: true,
    totalHours: 18,
    activitiesCount: 4,
    ngosSupportedCount: 2,
    badges: [
      { name: "Verified Presence", icon: "✓", desc: "Authenticated attendance at on-ground events" },
      { name: "Education Ally", icon: "🎒", desc: "Contributed 10+ hours to child literacy drives" },
      { name: "Community Witness", icon: "👁️", desc: "Corroborated 3 post-event activity reports" }
    ],
    history: [
      { activity: "School Kit Distribution Drive", ngo: "Udaan Foundation", date: "24 Sep 2026", hours: 4, status: "Verified & Corroborated" },
      { activity: "Book Sorting & Labeling Drive", ngo: "Udaan Foundation", date: "10 Aug 2026", hours: 4, status: "Verified" },
      { activity: "Monsoon Relief Supply Packing", ngo: "Jan Kalyan Samiti", date: "22 Jul 2026", hours: 5, status: "Verified" },
      { activity: "Youth Literacy Pilot Clinic", ngo: "Udaan Foundation", date: "15 Jun 2026", hours: 5, status: "Verified" }
    ]
  }
};
