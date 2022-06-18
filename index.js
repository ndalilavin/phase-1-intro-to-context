// Your code here
function createEmployeeRecord(record){
    return{
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRowData){
 return employeeRowData.map(function(record){
    return createEmployeeRecord(record)
 })
}

const createTimeInEvent = function(employee, dateStamp){
    const [date, hour] = dateStamp.split (' ')


    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, workedDate){
    const inEvent = employee.timeInEvents.find(function(event){
        return event.date === workedDate
    })

    const outEvent = employee.timeOutEvents.find(function(event){
        return event.date === workedDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateWorked){
     const employeeWage = hoursWorkedOnDate(employee, dateWorked)
     *employee.payPerHour
     return parseFloat(employeeWage.toString())
}

function allWagesFor(employee){
    const updatedBpRecord = employee.timeInEvents.map(function(event){
        return event.date
    })

    const payable = updatedBpRecord.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}