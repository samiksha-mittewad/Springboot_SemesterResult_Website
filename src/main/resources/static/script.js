document.getElementById("resultForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get student details
    const studentName = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();

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

        // Get saved + calculated data from backend
        const result = await response.json();

        // Display success message
        document.getElementById("resultMessage").innerHTML =
            `<strong>Result saved successfully!</strong><br>
             Student: ${result.studentName}<br>
             Student ID: ${result.studentId}`;

        // Create result table
        let tableHTML = `
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>MSE / 30</th>
                        <th>ESE / 70</th>
                        <th>Total / 100</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let semesterTotal = 0;

        result.subjects.forEach(subject => {

            semesterTotal += subject.totalMarks;

            tableHTML += `
                <tr>
                    <td>${subject.subjectName}</td>
                    <td>${subject.mseMarks}</td>
                    <td>${subject.eseMarks}</td>
                    <td>${subject.totalMarks}</td>
                    <td>${subject.grade}</td>
                </tr>
            `;
        });

        const percentage = semesterTotal / result.subjects.length;

        tableHTML += `
                </tbody>
            </table>

            <div class="semester-summary">
                <h3>Semester Summary</h3>
                <p><strong>Average Percentage:</strong> ${percentage.toFixed(2)}%</p>
            </div>
        `;

        // Show result table
        document.getElementById("resultTableContainer").innerHTML = tableHTML;

        // Scroll to result
        document.getElementById("resultSection").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        document.getElementById("resultMessage").innerHTML =
            `<strong>Error!</strong> Could not save the result. Make sure Spring Boot is running.`;
    }
});