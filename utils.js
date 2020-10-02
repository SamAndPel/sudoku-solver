// A collection of utility functions used by the sudoku solver

 // UTILITY FUNCTIONS -----------
 function closeModals() {
    document.getElementById("loadmodal").style.display = "none";
    document.getElementById("exportmodal").style.display = "none";
    console.log("[-] Modal closed");
}

function setButtons(start, stop, loadgrid, exportgrid, clear, clearall) {
    document.getElementById("solvebtn").disabled = start;
    document.getElementById("stopbtn").disabled = stop;
    document.getElementById("loadbtn").disabled = loadgrid;
    document.getElementById("exportbtn").disabled = exportgrid;
    document.getElementById("clearbtn").disabled = clear;
    document.getElementById("clearallbtn").disabled = clearall;
}

function setStatus(message) {
    document.getElementById("status").innerHTML = message;
}

function getIndex(x, y) {
    if ((x >= 0) && (x < 9) && (y >= 0) && (y < 9)) {
        return ((y * 9) + x);
    } else {
        return -1;
    }
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function validateJSON(str) {
    // Is the data actually JSON?
    try {
        const data = JSON.parse(str);
        // Is it nine indices long?
        if (data.length === 9) {
            for (var i = 0; i < data.length; i++) {
                // is each index an array of length 9?
                if (data[i].length === 9) {
                    for (var j = 0; j < data[i].length; j++) {
                        // Is the contents of that array 9 ints 0 <= x < 10 ?
                        if (isNumeric(data[i][j]) && data[i][j] >= 0 && data[i][j] <= 9) {
                            // its valid, do nothing
                            continue;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

function validateNumeric(str) {
    if (str.length === 81 && isNumeric(str)) {
        return true;
    } else {
        return false;
    }
}

function loaddata(dataarr) {
    console.log("[*] Sudoku loaded");
    initialise(true);
    for (var i = 0; i < dataarr.length; i++) {
        master.data[i].value = parseInt(dataarr[i]);
        if (parseInt(dataarr[i]) !== 0) {
            master.data[i].mutable = false;
        }
    }
    setButtons(false, true, false, false, true, false);
    master.render();
}

function loadInitial() {
    const initialstr = "090046025002970000670000009301000607000030000508000102200000086000097300910680070";
    var numericarray = [];
    for (var i = 0; i < initialstr.length; i++) {
        numericarray.push(initialstr[i]);
    }

    // console.log(numericarray);
    loaddata(numericarray);
}


// SUDOKU FUNCTIONS ----------
function initialise(doFullClear) {
    setStatus("Waiting for input");
    if (doFullClear) {
        for (var i = 0; i < master.data.length; i++) {
            master.data[i].value = 0;
            master.data[i].mutable = true;
            master.data[i].isHighlighted = false;
        }
    } else {
        for (var i = 0; i < master.data.length; i++) {
            if (master.data[i].mutable) {
                master.data[i].value = 0;
                master.data[i].isHighlighted = false;
            }
        }
    }

    routeStack = [];
    selectedIndex = 0;
    backtracking = false;
}

function doCycle() {
    if (selectedIndex > master.data.length - 1) {
        console.log("[+] Solution found");
        setStatus("Solution found!");
        stop(true);
        document.getElementById("solvebtn").disabled = true;
    } else {
        if (master.data[selectedIndex].mutable) {
            if (backtracking) {
                master.data[selectedIndex].value = master.data[selectedIndex].value + 1;
            }
            var val = master.data[selectedIndex].value;
            while (((val < 9) && (!master.isValid())) || (val == 0)) {
                master.data[selectedIndex].value = master.data[selectedIndex].value + 1;
                val++;
            }
            if ((val < 10) && (master.isValid())) {
                routeStack.push(selectedIndex);
                master.data[selectedIndex].isHighlighted = true;
                selectedIndex++;
                backtracking = false;
            } else {
                // console.log("[-] Backtracking")
                master.data[selectedIndex].value = 0;
                master.data[selectedIndex].isHighlighted = false;
                if (routeStack.length > 0) {
                    selectedIndex = routeStack.pop();
                    backtracking = true;
                } else {
                    console.log("[-] No possible solution");
                    setStatus("No possible solutions.");
                    stop(true);
                }
            }
        } else {
            selectedIndex++;
        }
    }
    master.render();
}


// BUTTON HANDLERS -------------
function solve() {
    console.log("[*] Attempting a solve");
    setButtons(true, false, true, true, true, true);
    setStatus("Attempting a solve...");
    repeater = setInterval(doCycle, 10);
}

function stop(isComplete) {
    clearInterval(repeater);
    console.log("[*] Stopped");
    if (!isComplete) {
        setStatus("Stopped");
    }
    setButtons(false, true, false, false, false, false);
}

function loadgrid() {
    console.log("[*] Opening load modal");
    document.getElementById("loadmodal").style.display = "block";
}

function exportgrid() {
    console.log("[*] Opening export modal");
    // Render image output
    document.getElementById("imgexport").src = canv.toDataURL("image/jpeg");
    // Render JSON output
    let jsondata = [];
    for (var i = 0; i < 9; i++) {
        let row = [];
        for (var j = 0; j < 9; j++) {
            row.push(master.data[getIndex(j, i)].value);
        }
        jsondata.push(row);
    }
    document.getElementById("jsonexport").innerHTML = JSON.stringify(jsondata);
    // Render numeric output
    let numericdata = "";
    for (var i = 0; i < master.data.length; i++) {
        numericdata = numericdata.concat(master.data[i].value);
    }
    document.getElementById("numericexport").innerHTML = numericdata;
    // Show modal
    document.getElementById("exportmodal").style.display = "block";
}

function clearattempt() {
    console.log("[*] Cleared attempt");
    initialise(false);
    setButtons(false, true, false, false, true, false);
    master.render();
}

function clearall() {
    console.log("[*] Cleared entire grid");
    initialise(true);
    setButtons(false, true, false, false, true, true);
    master.render();
}

function getinput() {
    const data = document.getElementById("loadtext").value;
    if (validateJSON(data)) {
        // work with data as JSON
        const jsondata = JSON.parse(data);
        var numericarray = [];
        for (var i = 0; i < jsondata.length; i++) {
            numericarray.push(...jsondata[i]);
        }

        // console.log(numericarray);
        loaddata(numericarray);
    } else if (validateNumeric(data)) {
        var numericarray = [];
        for (var i = 0; i < data.length; i++) {
            numericarray.push(data[i]);
        }

        // console.log(numericarray);
        loaddata(numericarray);
    } else {
        console.log("[-] Invalid data");
    }
}