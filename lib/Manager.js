// importing Employee constructor 
const Employee = require('./Employee');

// manager constructor extends employee constructor 
class Manager extends Employee {
    constructor (name, id, email, officeNum) {
        // calling employee constructor
        super (name, id, email); 
        
        this.officeNum = officeNum; 
    }

    // override employee role to manager 
    getRole () {
        return "Manager";
    }
}

module.exports = Manager; 