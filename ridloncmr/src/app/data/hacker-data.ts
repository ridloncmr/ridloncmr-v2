export const FakeCodeSnippets: string[] = [
    `import socket\ns = socket.socket()\ns.connect(("target.com", 22))\nprint("Exploiting SSH vulnerability...")`,
    `const exploit = "<script>alert('Hacked!')</script>";\ndocument.body.innerHTML = exploit;`,
    `#!/bin/bash\necho "Scanning target network..."\nnmap -p 22,80,443 -A example.com`,
    `SELECT * FROM users WHERE username='admin' AND password='' OR '1'='1'; --`,
    `section .text\nglobal _start\n_start:\n  mov eax, 1\n  mov ebx, 0\n  int 0x80`
  ];

  export const HackingProcesses: string[] = [
    "Initializing backdoor connection...",
    "Spoofing MAC address...",
    "Scanning IP ranges...",
    "Harvesting credentials...",
    "Injecting SQL payload...",
    "Brute-forcing SSH login...",
    "Decrypting 256-bit AES...",
    "Uploading rootkit...",
    "Escalating privileges...",
    "System access granted. Deploying payload..."
  ];

  // Fake IP Scanning
  export const IpScanResults: string[] = [
    "192.168.1.1 - Open Ports: 22, 80, 443",
    "192.168.1.2 - Open Ports: 3306 (MySQL), 5900 (VNC)",
    "192.168.1.3 - Firewalled",
    "10.0.0.5 - Detected Remote Desktop Protocol (RDP)",
    "172.16.0.2 - Weak SSH Authentication Found"
  ];

  // Brute-force Attempts
  export const BruteForceAttempts: string[] = [
    "Attempting password: hunter2",
    "Attempting password: password123",
    "Attempting password: qwerty",
    "Attempting password: letmein",
    "Attempting password: admin"
  ];

  // Fake Password Dumps
  export const PasswordDumps: string[] = [
    "[root] => password: 1qaz@WSX",
    "[admin] => password: P@ssw0rd!",
    "[user] => password: abc1234",
    "[sysadmin] => password: welcome1"
  ];

  // Fake Error Messages
  export const ErrorMessages: string[] = [
    "ERROR: Connection lost. Retrying...",
    "WARNING: Intrusion detected! Spoofing MAC address...",
    "Access Denied. Retrying with elevated privileges...",
    "Segmentation fault (core dumped)",
    "Kernel panic - not syncing: Fatal exception"
  ];
