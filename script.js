document.getElementById('leaseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const startDate = new Date(document.getElementById('startDate').value);
    const mileageStart = parseInt(document.getElementById('mileageStart').value);
    const leaseLength = parseInt(document.getElementById('leaseLength').value);
    const totalMileage = parseInt(document.getElementById('totalMileage').value);

    const today = new Date();
    const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const totalLeaseDays = leaseLength * 30.44; // Average days per month
    const monthsElapsed = daysElapsed / 30.44;

    // Calculate expected mileage based on proportion of lease elapsed
    const mileageAllowed = totalMileage - mileageStart;
    const expectedMileage = Math.round(mileageStart + (mileageAllowed * (daysElapsed / totalLeaseDays)));
    const totalAllowedMileage = mileageStart + mileageAllowed;
    const daysRemaining = Math.max(0, Math.floor(totalLeaseDays - daysElapsed));
    const milesRemaining = Math.max(0, totalAllowedMileage - expectedMileage);

    // Track calculation event in Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculate', {
            'event_category': 'Lease Calculator',
            'event_label': 'Mileage Calculation',
            'value': expectedMileage
        });
    }

    // Update calculator display
    const displayValue = document.getElementById('displayValue');
    displayValue.textContent = expectedMileage.toLocaleString();

    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    resultDiv.innerHTML = `
        <h3>Details</h3>
        <p>${daysElapsed} days elapsed • ${monthsElapsed.toFixed(1)} months elapsed</p>
        <p>Total allowed: ${totalAllowedMileage.toLocaleString()} miles</p>
        ${daysRemaining > 0 ? `<p>Miles remaining: ${milesRemaining.toLocaleString()}</p>` : ''}
    `;
});

