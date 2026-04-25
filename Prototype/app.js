document.addEventListener('DOMContentLoaded', () => {
    // KYC Trigger
    const signupBtn = document.querySelector('.signup-trigger');
    const kycOverlay = document.getElementById('kyc-overlay');
    const closeKyc = document.querySelector('.close-kyc');

    signupBtn.addEventListener('click', () => {
        kycOverlay.classList.remove('hidden');
        resetKyc();
    });

    closeKyc.addEventListener('click', () => {
        kycOverlay.classList.add('hidden');
    });

    // KYC Step Logic
    const nextBtns = document.querySelectorAll('.next-kyc');
    const kycContents = document.querySelectorAll('.kyc-action-content');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentStep = 1;

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < 3) {
                // Update Progress visual
                progressSteps[currentStep - 1].classList.remove('current');
                progressSteps[currentStep - 1].classList.add('completed');
                
                // Hide current, show next
                kycContents[currentStep - 1].classList.add('hidden');
                currentStep++;
                kycContents[currentStep - 1].classList.remove('hidden');
                
                // Set next step as current
                progressSteps[currentStep - 1].classList.add('current');

                if (currentStep === 3) {
                    setTimeout(() => otpFields[0].focus(), 500);
                }
            }
        });
    });

    // Finish KYC
    const finishBtn = document.getElementById('finish-kyc');
    finishBtn.addEventListener('click', () => {
        kycOverlay.classList.add('hidden');
        alert("Registration Successful!");
    });

    function resetKyc() {
        currentStep = 1;
        kycContents.forEach(c => c.classList.add('hidden'));
        kycContents[0].classList.remove('hidden');
        
        progressSteps.forEach(s => s.classList.remove('completed', 'current'));
        progressSteps[0].classList.add('current');
    }

    // OTP Navigation
    const otpFields = document.querySelectorAll('.otp-field');
    otpFields.forEach((field, i) => {
        field.addEventListener('keyup', (e) => {
            if (e.key >= 0 && e.key <= 9) {
                if (i < otpFields.length - 1) otpFields[i + 1].focus();
            } else if (e.key === 'Backspace') {
                if (i > 0) otpFields[i - 1].focus();
            }
        });
    });

    // Responsive Sidebar Logic
    const sidebar = document.querySelector('.sidebar');
    const openSidebarBtn = document.getElementById('open-sidebar');

    openSidebarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== openSidebarBtn) {
            sidebar.classList.remove('open');
        }
    });
});
