export const DOCS = [
  {
    "slug": "welcome",
    "title": "Welcome & Getting Started",
    "category": "Getting Started",
    "description": "A quick orientation before you begin. Read this in full to ensure everything is set up correctly the first time.",
    "prev": null,
    "next": {
      "label": "Windows Reinstallation",
      "slug": "windows-reinstallation"
    },
    "content": [
      {
        "type": "callout",
        "variant": "info",
        "title": "Important Orientation",
        "text": "You are just a few steps away from ensuring maximum privacy and clean system isolation. To make sure the process is successful, follow every step in this guide exactly as written, and in the correct order. Skipping, reordering, or ignoring steps may cause the setup to fail."
      },
      {
        "type": "section",
        "title": "Support and Assistance",
        "body": "If you become stuck, encounter an error, or are unsure about any step, join our Discord community immediately. Our team and community members will guide you through the process to ensure everything is completed correctly."
      },
      {
        "type": "discord-banner",
        "url": "https://discord.gg/XFEkf2kV26",
        "label": "Join Private Solutions Discord"
      }
    ]
  },
  {
    "slug": "windows-reinstallation",
    "title": "Windows Reinstallation",
    "category": "Preparation",
    "description": "Complete every requirement below before reinstalling Windows. Skipping any step may cause the setup to fail or leave tracking traces.",
    "prev": {
      "label": "Welcome",
      "slug": "welcome"
    },
    "next": {
      "label": "RAID Reinstallation (AMD)",
      "slug": "raid-reinstallation"
    },
    "content": [
      {
        "type": "callout",
        "variant": "warning",
        "title": "AMD CPU Users Notice",
        "text": "If your CPU is AMD, for the best results you should follow the RAID Reinstallation guide instead of a standard Windows reinstall. RAID changes your disk serials."
      },
      {
        "type": "section",
        "title": "Before Reinstalling",
        "body": "For GIGABYTE motherboards only: If your motherboard model ends in AX or AC (e.g. B760 DS3H AC) and you use Ethernet, you must disable or remove the internal Wi-Fi card. Newer GIGABYTE/AORUS X-series boards allow disabling Wi-Fi directly in the BIOS."
      },
      {
        "type": "section",
        "title": "Getting a Fresh Login",
        "body": "For the most accurate isolation, always use a fresh Windows installation together with a fresh user account that has never been associated with your PC. Testing with an old banned account can produce misleading results."
      },
      {
        "type": "steps",
        "title": "Creating Installation Media",
        "items": [
          "Download the official Windows Media Creation Tool (Windows 10 or Windows 11) from Microsoft.",
          "Run the Media Creation Tool and select \"Create installation media (USB flash drive)\".",
          "Select your USB drive (minimum 8GB) and wait for the tool to finish creating the bootable drive.",
          {
            "text": "Download the automated autounattend.xml debloat file and place it directly into the root of your USB flash drive. This file debloats Windows, creates a clean local admin account, and disables BitLocker.",
            "link": {
              "type": "link",
              "href": "https://mega.nz/file/47BEFIYQ#ayjjlRsHVNCNxKU0_cYxg357LCPhWAnOo1NZjl_jDRQ",
              "label": "Download autounattend.xml"
            }
          },
          "Go to your motherboard manufacturer website, download your LAN/Ethernet drivers and WLAN drivers, and copy the installers to your USB drive so you have internet immediately upon setup."
        ]
      },
      {
        "type": "image",
        "src": "/guide/usb_looklike.jpg",
        "alt": "USB flash drive root structure"
      },
      {
        "type": "steps",
        "title": "Booting and Partition Setup",
        "items": [
          "Hold the SHIFT key while clicking Restart in Windows to enter Advanced Startup.",
          "Select \"Use a device\" and choose your USB drive (or set USB as #1 in BIOS boot priority).",
          "Click \"Install Now\" -> select language -> choose \"Custom: Install Windows only (advanced)\".",
          "On the partition screen, delete every partition on your primary drive until it shows as Unallocated Space.",
          "Click Next to begin the clean installation."
        ]
      },
      {
        "type": "image",
        "src": "/guide/window_setup.png",
        "alt": "Clean unallocated partition setup"
      }
    ]
  },
  {
    "slug": "raid-reinstallation",
    "title": "RAID Reinstallation (AMD)",
    "category": "Preparation",
    "description": "Change your disk serials via AMD RAID mode. Highly recommended for AMD systems to completely scramble hard drive serial identifiers.",
    "prev": {
      "label": "Windows Reinstallation",
      "slug": "windows-reinstallation"
    },
    "next": {
      "label": "Flashing BIOS",
      "slug": "flash-bios"
    },
    "content": [
      {
        "type": "callout",
        "variant": "tip",
        "title": "Why AMD RAID?",
        "text": "AMD RAID mode masks the underlying physical disk hardware serial numbers by presenting virtual RAID volumes (Array 1) to Windows, ensuring anti-cheats cannot read your real SSD hardware serials."
      },
      {
        "type": "section",
        "title": "Driver Preparation",
        "body": "Before starting, download the official AMD RAID drivers from your motherboard support page. You will need NVMe RAID drivers (rcraid, rcbottom, rccfg) copied onto your Windows installation USB flash drive."
      },
      {
        "type": "steps",
        "title": "BIOS Configuration for RAID",
        "items": [
          "Restart PC and press DEL/F2 to enter BIOS.",
          "Enable RAID mode under Advanced -> SATA/NVMe Configuration.",
          "Enable RAIDXpert2 configuration utility in BIOS.",
          "Delete existing arrays and create a new RAID 0 or Volume array containing your target SSD.",
          "Save changes (F10) and reboot into your Windows USB installation media."
        ]
      },
      {
        "type": "image",
        "src": "/guide/array_image.png",
        "alt": "RAID Array Configuration"
      },
      {
        "type": "steps",
        "title": "Loading RAID Drivers in Windows Setup",
        "items": [
          "Boot into Windows Setup -> Custom Installation.",
          "If no drive is visible, click \"Load Driver\" and browse to your USB drive where you saved the AMD RAID drivers.",
          "Load rcbottom.inf first, then rcraid.inf, then rccfg.inf.",
          "Your RAID virtual disk will appear as unallocated space. Select it and click Next to install Windows."
        ]
      }
    ]
  },
  {
    "slug": "flash-bios",
    "title": "Flashing BIOS",
    "category": "Preparation",
    "description": "Flash your motherboard BIOS to a different version to reset hardware identifiers and clear NVRAM tables.",
    "prev": {
      "label": "RAID Reinstallation",
      "slug": "raid-reinstallation"
    },
    "next": {
      "label": "BIOS Configurations",
      "slug": "bios-config"
    },
    "content": [
      {
        "type": "section",
        "title": "Why Flash the BIOS?",
        "body": "Flashing the BIOS clears out persistent NVRAM variables, updates firmware microcode, and allows fresh serial generation without motherboard residual flags."
      },
      {
        "type": "steps",
        "title": "BIOS Flashing Procedure",
        "items": [
          "Identify your motherboard model using msinfo32 or physically looking at the board.",
          "Visit your motherboard manufacturer official support website.",
          "Download a BIOS version that is different from your current version (either newer or older).",
          "Format a USB drive as FAT32 and copy the extracted BIOS file into the USB root directory.",
          "Reboot into BIOS -> open EZ Flash (ASUS), M-Flash (MSI), Q-Flash (GIGABYTE), or Instant Flash (ASRock).",
          "Select the BIOS file and confirm the flash. Do NOT turn off power during flashing."
        ]
      },
      {
        "type": "image",
        "src": "/guide/bios_flash.png",
        "alt": "BIOS Flashing Utility"
      }
    ]
  },
  {
    "slug": "bios-config",
    "title": "BIOS Configurations",
    "category": "Preparation",
    "description": "Essential BIOS settings: Disabling TPM / Intel PTT, Secure Boot, Wi-Fi, and Bluetooth modules.",
    "prev": {
      "label": "Flashing BIOS",
      "slug": "flash-bios"
    },
    "next": {
      "label": "Safety",
      "slug": "safety"
    },
    "content": [
      {
        "type": "callout",
        "variant": "warning",
        "title": "Crucial Settings",
        "text": "TPM and Secure Boot must be disabled for most spoofing solutions unless explicitly using our TPM spoofing module."
      },
      {
        "type": "steps",
        "title": "Required BIOS Settings",
        "items": [
          "TPM: Locate AMD fTPM or Intel Platform Trust Technology (PTT) and set to Disabled.",
          "Secure Boot: Set Secure Boot mode to Disabled or \"Other OS\".",
          "CSM (Compatibility Support Module): Keep Disabled (UEFI mode enabled).",
          "Integrated Wi-Fi / Bluetooth: If using Ethernet, disable onboard Wi-Fi and Bluetooth controllers in Onboard Devices Configuration."
        ]
      }
    ]
  },
  {
    "slug": "safety",
    "title": "Safety Precautions",
    "category": "Preparation",
    "description": "Privacy factors, environmental isolation rules, and habits to prevent immediate re-linking.",
    "prev": {
      "label": "BIOS Configurations",
      "slug": "bios-config"
    },
    "next": {
      "label": "VHD for Intel",
      "slug": "vhd-intel"
    },
    "content": [
      {
        "type": "section",
        "title": "Network & Account Hygiene",
        "body": "Never log into a previously banned Discord, game launcher, or browser account without clean network credentials and fresh cookies."
      },
      {
        "type": "steps",
        "title": "Rules to Follow",
        "items": [
          "Restart your router or use a high-quality residential VPN / mobile hotspot to rotate your external IP address.",
          "Clear your DNS cache and flush ARP tables before launching games.",
          "Do not plug in old USB drives containing detected software or previous logs.",
          "Create brand new game and launcher accounts using fresh email addresses."
        ]
      }
    ]
  },
  {
    "slug": "vhd-intel",
    "title": "VHD for Intel (Alternative)",
    "category": "Intel Alternative",
    "description": "Virtual Hard Disk setup for Intel CPU systems to scramble disk serials without AMD RAID.",
    "prev": {
      "label": "Safety",
      "slug": "safety"
    },
    "next": {
      "label": "Download Loader",
      "slug": "download-loader"
    },
    "content": [
      {
        "type": "section",
        "title": "Why Virtual Hard Disk (VHD)?",
        "body": "On Intel systems where AMD RAID is not supported, installing Windows inside a native VHD (Virtual Hard Disk) presents a virtualized disk serial to the operating system and anticheats, protecting your physical disk identity."
      },
      {
        "type": "steps",
        "title": "VHD Creation Steps",
        "items": [
          "Boot from your Windows USB installation media.",
          "Press Shift + F10 on the initial install screen to open Command Prompt.",
          "Type \"diskpart\" and press Enter.",
          "Type \"create vdisk file=C:\\win.vhd maximum=120000 type=expandable\" and press Enter.",
          "Type \"select vdisk file=C:\\win.vhd\" then \"attach vdisk\".",
          "Exit diskpart and proceed to custom installation; select the new attached VHD drive to install Windows."
        ]
      }
    ]
  },
  {
    "slug": "download-loader",
    "title": "Download Loader",
    "category": "Woofer Setup",
    "description": "Prerequisites, Python environment setup, and loader download.",
    "prev": {
      "label": "VHD for Intel",
      "slug": "vhd-intel"
    },
    "next": {
      "label": "Setting It Up",
      "slug": "spoofing"
    },
    "content": [
      {
        "type": "steps",
        "title": "Prerequisites",
        "items": [
          "Download and install Python 3.11 or later from python.org.",
          "Ensure you check the box \"Add python.exe to PATH\" during installation.",
          "Download the official Private Solutions Loader from our Discord announcements or client portal.",
          "Extract the archive to a clean folder on your desktop."
        ]
      },
      {
        "type": "image",
        "src": "/guide/add_path.png",
        "alt": "Python Add to PATH checkbox"
      }
    ]
  },
  {
    "slug": "spoofing",
    "title": "Setting It Up & Spoofing",
    "category": "Woofer Setup",
    "description": "Step-by-step execution of the woofer spoofer tool to modify hardware identifiers.",
    "prev": {
      "label": "Download Loader",
      "slug": "download-loader"
    },
    "next": {
      "label": "Magic Link",
      "slug": "magic-link"
    },
    "content": [
      {
        "type": "steps",
        "title": "Running the Spoofer",
        "items": [
          "Right click the loader executable and select \"Run as administrator\".",
          "Paste your product key when prompted or log in with your Discord account.",
          "Select your target motherboard brand (ASUS, GIGABYTE, MSI, ASRock, or Generic).",
          "The loader will flash clean SMBIOS UUIDs, baseboard serial numbers, MAC addresses, and disk identifiers.",
          "Restart your computer when prompted to finalize changes in NVRAM."
        ]
      },
      {
        "type": "image",
        "src": "/guide/loader_auth.png",
        "alt": "Loader Authentication"
      },
      {
        "type": "image",
        "src": "/guide/spoofreport.png",
        "alt": "Spoof Verification Report"
      }
    ]
  },
  {
    "slug": "magic-link",
    "title": "Magic Link Activation",
    "category": "Woofer Setup",
    "description": "Fast license key registration and Discord integration via Magic Link.",
    "prev": {
      "label": "Setting It Up",
      "slug": "spoofing"
    },
    "next": {
      "label": "Normal Spoofing",
      "slug": "normal-spoofing"
    },
    "content": [
      {
        "type": "section",
        "title": "One-Click License Activation",
        "body": "Magic Link allows instant license verification without typing long serial keys. Simply authenticate via Discord on our client portal and click your personalized link."
      },
      {
        "type": "image",
        "src": "/guide/magic_link.png",
        "alt": "Magic Link Portal"
      }
    ]
  },
  {
    "slug": "normal-spoofing",
    "title": "Normal Spoofing (Motherboard Guide)",
    "category": "Woofer Setup",
    "description": "Motherboard-specific procedures for ASUS, GIGABYTE, MSI, and ASRock systems.",
    "prev": {
      "label": "Magic Link",
      "slug": "magic-link"
    },
    "next": {
      "label": "HP Spoofing",
      "slug": "hp-spoofing"
    },
    "content": [
      {
        "type": "section",
        "title": "Motherboard Compatibility",
        "body": "Each motherboard manufacturer stores hardware serials in different EEPROM and SMBIOS formats. Select your specific board instructions below."
      },
      {
        "type": "steps",
        "title": "Manufacturer Specifics",
        "items": [
          "ASUS: Requires clearing Armoury Crate services. Disable ASUS grid in BIOS.",
          "GIGABYTE / AORUS: Disable @BIOS and GCC utilities before running.",
          "MSI: Clear Dragon Center / MSI Center. Dragon Center can restore old serials if kept running.",
          "ASRock: Standard AMI BIOS setup; runs flawlessly with zero extra preparation."
        ]
      },
      {
        "type": "image",
        "src": "/guide/normal.png",
        "alt": "Motherboard Spoofing Steps"
      }
    ]
  },
  {
    "slug": "hp-spoofing",
    "title": "HP Machine Spoofing",
    "category": "Woofer Setup",
    "description": "Specialized steps for HP OMEN, Pavilion, and OEM desktop/laptop systems.",
    "prev": {
      "label": "Normal Spoofing",
      "slug": "normal-spoofing"
    },
    "next": {
      "label": "Spoofing Errors",
      "slug": "spoofing-errors"
    },
    "content": [
      {
        "type": "section",
        "title": "HP OEM Considerations",
        "body": "HP systems lock SMBIOS tables under Manufacturer Programming Mode (MPM). Follow this guide to unlock MPM before modifying serial numbers."
      },
      {
        "type": "image",
        "src": "/guide/mpm.png",
        "alt": "HP MPM Mode"
      }
    ]
  },
  {
    "slug": "spoofing-errors",
    "title": "Common Spoofing Errors & Fixes",
    "category": "Woofer Setup",
    "description": "Fixing EFUSE Full, Checksum Mismatch, Driver load errors, and PCIe init failures.",
    "prev": {
      "label": "HP Spoofing",
      "slug": "hp-spoofing"
    },
    "next": {
      "label": "Post-Spoof Notes",
      "slug": "post-spoof-notes"
    },
    "content": [
      {
        "type": "steps",
        "title": "Common Issues & Resolutions",
        "items": [
          "EFUSE Full: Your board NVRAM table has reached maximum write cycles. Solution: Reflash BIOS with USB to clear old NVRAM entries.",
          "Driver Load Failed (Error 0xC0000022): Disable Windows Core Isolation (Memory Integrity) in Windows Security -> Device Security.",
          "Checksum Error: Run the SMBIOS fixer tool included with the loader before applying custom serials.",
          "Network Adapter Missing: Reinstall your LAN/WLAN drivers from motherboard website."
        ]
      }
    ]
  },
  {
    "slug": "post-spoof-notes",
    "title": "Post-Spoof Notes & Checklist",
    "category": "Woofer Setup",
    "description": "Mandatory rules and checklist to follow after successfully spoofing your system.",
    "prev": {
      "label": "Spoofing Errors",
      "slug": "spoofing-errors"
    },
    "next": {
      "label": "TPM Spoofing",
      "slug": "tpm-spoofing"
    },
    "content": [
      {
        "type": "steps",
        "title": "Post-Spoof Verification",
        "items": [
          "Open Command Prompt as admin and run \"wmic bios get serialnumber\" to verify new BIOS serial.",
          "Run \"wmic baseboard get serialnumber\" to confirm baseboard serial changed.",
          "Run \"getmac\" to confirm your network MAC addresses are randomized.",
          "Verify your IP address is fresh via ipinfo.io before launching games."
        ]
      },
      {
        "type": "image",
        "src": "/guide/serialchecker_ss.png",
        "alt": "Serial Checker Screenshot"
      }
    ]
  },
  {
    "slug": "tpm-spoofing",
    "title": "TPM Spoofing Solution",
    "category": "Hardware Solutions",
    "description": "TPM 2.0 bypass and modification methods for high-factor games like Vanguard and EAC.",
    "prev": {
      "label": "Post-Spoof Notes",
      "slug": "post-spoof-notes"
    },
    "next": {
      "label": "ARP Tables",
      "slug": "arp-tables"
    },
    "content": [
      {
        "type": "section",
        "title": "TPM 2.0 Architecture",
        "body": "Modern anticheats read the hardware endorsement key (EK) and certificates stored inside the discrete or firmware TPM. Our TPM solution randomizes the endorsement credential hierarchy without disabling Windows 11 compatibility."
      },
      {
        "type": "image",
        "src": "/guide/tpm_thumb.png",
        "alt": "TPM Spoofing"
      }
    ]
  },
  {
    "slug": "arp-tables",
    "title": "ARP Tables & Router Flushing",
    "category": "Hardware Solutions",
    "description": "Flushing and randomizing Address Resolution Protocol (ARP) tables to prevent router-level MAC fingerprinting.",
    "prev": {
      "label": "TPM Spoofing",
      "slug": "tpm-spoofing"
    },
    "next": null,
    "content": [
      {
        "type": "steps",
        "title": "Flushing ARP Tables",
        "items": [
          "Open Command Prompt as Administrator.",
          "Run \"netsh interface ip delete arpcache\" to clear current cached mappings.",
          "Run \"arp -d *\" to purge static and dynamic ARP entries.",
          "Restart your router or switch LAN ports on your motherboard/router to trigger fresh gateway handshakes."
        ]
      }
    ]
  }
];
