window.maxScore = 0;
window.currentScore = 0;

window.onload = function() {
    if (localStorage.getItem("grades") !== null) {
        var data = JSON.parse(localStorage.getItem("grades"));
        var table = document.getElementById("myassignments");

        // get the key which will be the name of the headers
        // ('Assignment', 'Due Date', 'Turn in Date', 'Score', '%')
        var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // add our stored json data to the table
        for (var i = 0; i < data.length; i++) {
            // create a new row
            var tr = document.createElement("tr");

            // add each cell with associated data
            for (var j = 0; j < col.length; j++) {
                addCell(tr, data[i][col[j]], '');
            }

            // add our delete option as the last cell
            addCell(tr, 'X', 'close')

            // add the row to our table
            table.children[0].appendChild(tr);
        }

        updateCloseButtons();
    }
}

function newElement() {
    var assignment = document.getElementById("assignment");
    var due = document.getElementById("due");
    var turnin = document.getElementById("turnin");
    var score = document.getElementById("score");
    var outof = document.getElementById("outof");
    var table = document.getElementById("myassignments");

    // validate our values
    if (validate(assignment.value, due.value, turnin.value, score.value, outof.value) == false) {
        return;
    }

    // reset our input fields
    assignment.value = '';
    due.value = '';
    turnin.value = '';
    score.value = '';
    outof.value = '';

    // focus the first textbox
    assignment.focus();

    // update our storage and close buttons
    storeTable(table);
    updateCloseButtons();
}

function validate(assignment, due, turnin, score, outof) {
    if(assignment === "" || due === "" || turnin === "" || score < 0 || outof < 1) {
        alert("All fields need valid information to be filled in.");
        return false;
    }

    var percent = ((score/outof) * 100);

    saveData(assignment, due, turnin, score, outof, percent);

    return true;
}

function saveData(assignment, due, turnin, score, outof, percent) {
    var tr = document.createElement("tr");
    var table = document.getElementById("myassignments");

    // add each of the passed in data to the row
    addCell(tr, assignment, '');
    addCell(tr, due, '');
    addCell(tr, turnin, '');
    addCell(tr, score + '/' + outof, '');
    addCell(tr, percent + '%', '');
    // add our delete option as the last cell
    addCell(tr, 'X', 'close')

    // add the row to our table
    table.children[0].appendChild(tr);

    // update our storage
    storeTable(table);
}

function addCell(tr, value, class_name) {
    var td = document.createElement("td");
    td.className = class_name;

    td.appendChild(document.createTextNode(value));
    tr.appendChild(td);
}

function updateCloseButtons() {
    var close = document.getElementsByClassName("close");
    var table = document.getElementById("myassignments");

    for (var index = 0; index < close.length; index++) {
        close[index].onclick = function() {
            // one level up is the <tr>
            var row = this.parentElement;
            table.deleteRow(row.rowIndex);
        }
    }
}

function storeTable(table) {
    var data = [];

    // first row needs to be headers
    var headers = ["Assignment", "Due Date", "Turn in Date", "Grade", "%"];

    // go through rows
    for (var rowindex = 1; rowindex < table.rows.length; rowindex++) {
        var tableRow = table.rows[rowindex];
        var rowData = {};

        // go through the cells (-1 due to our close cell)
        var cells = tableRow.cells.length - 1;
        for (var colindex = 0; colindex < cells; colindex++) {
            rowData[headers[colindex]] = tableRow.cells[colindex].innerHTML;
        }

        // add the row data to our main data array
        data.push(rowData);
    }

    // send the array to local storage via JSON
    localStorage.setItem('grades', JSON.stringify(data));
}

function clearElement() {
    // clear the local storage
    localStorage.clear();

    var table = document.getElementById("myassignments");

    // delete all but our header row in the table.
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}