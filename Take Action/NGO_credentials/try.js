function submitForm() {
    // Get values from the form
    const ngoName = document.getElementById('ngoName').value;
    const registrationDocs = document.getElementById('registrationDocs').value;
    const missionObjectives = document.getElementById('missionObjectives').value;
    const projectReports = document.getElementById('projectReports').value;
    const financialStatements = document.getElementById('financialStatements').value;
    const budgetProposal = document.getElementById('budgetProposal').value;
    const monitoringPlan = document.getElementById('monitoringPlan').value;
    const timeline = document.getElementById('timeline').value;
    const references = document.getElementById('references').value;
    const communicationPlan = document.getElementById('communicationPlan').value;
    const transparencyPolicies = document.getElementById('transparencyPolicies').value;
    const legalCompliance = document.getElementById('legalCompliance').value;

    // Display values in a div
    const credentialsContainer = document.getElementById('credentials-container');
    credentialsContainer.innerHTML = `
        <p><strong>NGO Name:</strong> ${ngoName}</p>
        <p><strong>Registration Documents:</strong> ${registrationDocs}</p>
        <p><strong>Mission and Objectives:</strong> ${missionObjectives}</p>
        <p><strong>Previous Project Reports:</strong> ${projectReports}</p>
        <p><strong>Financial Statements:</strong> ${financialStatements}</p>
        <p><strong>Budget Proposal:</strong> ${budgetProposal}</p>
        <p><strong>Monitoring and Evaluation Plan:</strong> ${monitoringPlan}</p>
        <p><strong>Timeline for Project Execution:</strong> ${timeline}</p>
        <p><strong>References and Recommendations:</strong> ${references}</p>
        <p><strong>Communication Plan:</strong> ${communicationPlan}</p>
        <p><strong>Transparency and Accountability Policies:</strong> ${transparencyPolicies}</p>
        <p><strong>Legal Compliance:</strong> ${legalCompliance}</p>
    `;

    // Display the credentials section
    const displayCredentials = document.getElementById('display-credentials');
    displayCredentials.style.display = 'block';
}
////////////////////////////////////////////////////////////
function displayFileName(inputId) {
    const fileInput = document.getElementById(inputId);
    const uploadedFileDiv = document.getElementById(`uploadedFile_${inputId}`);
    const fileName = fileInput.files[0].name;
    uploadedFileDiv.textContent = `Uploaded File: ${fileName}`;
}

function addFinancialStatementYear() {
    const container = document.getElementById('financialStatementsContainer');
    const year = new Date().getFullYear(); // Get the current year
    const inputId = `financialStatement_${year}`;

    // Create a new file input for the financial statement year
    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.textContent = `Financial Statement ${year} (PDF):`;
    container.appendChild(label);

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('id', inputId);
    input.setAttribute('accept', '.pdf');
    input.setAttribute('onchange', `displayFileName('${inputId}')`);
    container.appendChild(input);

    const uploadedFileDiv = document.createElement('div');
    uploadedFileDiv.setAttribute('class', 'uploaded-file');
    uploadedFileDiv.setAttribute('id', `uploadedFile_${inputId}`);
    container.appendChild(uploadedFileDiv);
}

function submitForm() {
    // Get values from the form
    const ngoName = document.getElementById('ngoName').value;
    // Add more fields as needed

    // Display values in a div
    const credentialsContainer = document.getElementById('credentials-container');
    credentialsContainer.innerHTML = `
        <p><strong>NGO Name:</strong> ${ngoName}</p>
        <!-- Display other fields -->

        <!-- Display uploaded files information -->
        <div class="uploaded-file" id="uploadedFile_registrationDocs"></div>
    `;

    // Display the financial statements information
    const financialStatementsContainer = document.getElementById('financialStatementsContainer');
    const financialStatementInputs = financialStatementsContainer.querySelectorAll('input[type="file"]');
    financialStatementInputs.forEach(input => {
        const fileName = input.files[0] ? input.files[0].name : 'Not uploaded';
        const uploadedFileDiv = document.createElement('div');
        uploadedFileDiv.setAttribute('class', 'uploaded-file');
        uploadedFileDiv.textContent = `Uploaded File: ${fileName}`;
        financialStatementsContainer.appendChild(uploadedFileDiv);
    });

    // Display the credentials section
    const displayCredentials = document.getElementById('display-credentials');
    displayCredentials.style.display = 'block';
}

// Add initial financial statement year input
addFinancialStatementYear();
