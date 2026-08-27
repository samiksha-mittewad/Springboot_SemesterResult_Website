document.getElementById("resultForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get student details
    const studentName = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();

    // Get UI elements
    const submitButton = document.querySelector(".submit-btn");
    const resultMessage = document.getElementById("resultMessage");
    const resultTableContainer = document.getElementById("resultTableContainer");

    // Create data object to send to Spring Boot
    const studentData = {
        studentName: studentName,
        studentId: studentId,

        subjects: [
            {
                subjectName: "Web Technologies",
                mseMarks: Number(document.getElementById("wtMse").value),
                eseMarks: Number(document.getElementById("wtEse").value)
            },
            {
                subjectName: "Data Structures and Algorithms",
                mseMarks: Number(document.getElementById("dsaMse").value),
                eseMarks: Number(document.getElementById("dsaEse").value)
            },
            {
                subjectName: "Database Management Systems",
                mseMarks: Number(document.getElementById("dbmsMse").value),
                eseMarks: Number(document.getElementById("dbmsEse").value)
            },
            {
                subjectName: "Object Oriented Programming",
                mseMarks: Number(document.getElementById("oopMse").value),
                eseMarks: Number(document.getElementById("oopEse").value)
            }
        ]
    };

    try {
        // Disable button while request is being processed
        submitButton.disabled = true;
        submitButton.innerHTML = 'Saving Result <span>⌛</span>';

        // Show processing message
        resultMessage.innerHTML = `
            <div class="processing-message">
                <strong>Processing your result...</strong>
                <span>Calculating marks and saving the result to the database.</span>
            </div>
        `;

        // Clear previous result
        resultTableContainer.innerHTML = "";

        // Send data to Spring Boot
        const response = await fetch("/api/result/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        // Check if request failed
        if (!response.ok) {
            throw new Error("Failed to save result");
        }

        // Get saved and calculated data from backend
        const result = await response.json();

        // Display success message
        resultMessage.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✓</div>

                <div>
                    <strong>Result generated successfully</strong>
                    <span>
                        ${result.studentName} · ${result.studentId}
                    </span>
                </div>
            </div>
        `;

        // Create result table
        let tableHTML = `
            <div class="result-table-wrapper">

                <table class="result-table">

                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>MSE</th>
                            <th>ESE</th>
                            <th>Total</th>
                            <th>Grade</th>
                        </tr>
                    </thead>

                    <tbody>
        `;

        let semesterTotal = 0;
        let passedSubjects = 0;

        // Add every subject to result table
        result.subjects.forEach((subject, index) => {

            semesterTotal += subject.totalMarks;

            // Count passed subjects
            if (subject.totalMarks >= 40) {
                passedSubjects++;
            }

            tableHTML += `
                <tr>

                    <td>
                        <span class="result-subject-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>
                        ${subject.subjectName}
                    </td>

                    <td>
                        ${subject.mseMarks}
                        <span class="marks-limit">/30</span>
                    </td>

                    <td>
                        ${subject.eseMarks}
                        <span class="marks-limit">/70</span>
                    </td>

                    <td>
                        <strong>${subject.totalMarks}</strong>
                        <span class="marks-limit">/100</span>
                    </td>

                    <td>
                        <span class="grade">
                            ${subject.grade}
                        </span>
                    </td>

                </tr>
            `;
        });

        // Calculate semester percentage
        const percentage = semesterTotal / result.subjects.length;

        // Calculate maximum possible marks
        const maximumMarks = result.subjects.length * 100;

        // Determine overall status
        const overallStatus =
            passedSubjects === result.subjects.length ? "PASS" : "FAIL";

        // Complete table and add semester summary
        tableHTML += `
                    </tbody>

                </table>

            </div>


            <div class="semester-summary">

                <div class="summary-title">
                    <p>SEMESTER PERFORMANCE</p>
                    <h3>Overall Result Summary</h3>
                </div>


                <div class="summary-grid">

                    <div class="summary-box">
                        <span>Total Marks</span>
                        <strong>${semesterTotal}</strong>
                        <small>Out of ${maximumMarks}</small>
                    </div>


                    <div class="summary-box">
                        <span>Percentage</span>
                        <strong>${percentage.toFixed(2)}%</strong>
                        <small>Semester Average</small>
                    </div>


                    <div class="summary-box">
                        <span>Overall Status</span>
                        <strong>${overallStatus}</strong>
                        <small>${passedSubjects} of ${result.subjects.length} Subjects Passed</small>
                    </div>

                </div>

            </div>
        `;

        // Show result table and summary
        resultTableContainer.innerHTML = tableHTML;

        // Scroll smoothly to result
        document.getElementById("resultSection").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {

        console.error("Error:", error);

        // Display error message
        resultMessage.innerHTML = `
            <div class="error-message">
                <strong>Unable to save the result.</strong>
                <span>
                    Please make sure Spring Boot and MySQL are running correctly.
                </span>
            </div>
        `;

        resultTableContainer.innerHTML = "";

    } finally {

        // Enable button again
        submitButton.disabled = false;

        // Restore button text
        submitButton.innerHTML = `
            Calculate & Save Result <span>→</span>
        `;
    }
});