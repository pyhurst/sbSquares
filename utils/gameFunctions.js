module.exports = {

    xArray: () => {
        let feederArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let xArray = []
    
        while (xArray.length < 10) {
            let value = feederArray[Math.floor(Math.random() * 10)]
            let check = false;
            for (let i = 0; i < xArray.length; i++) {
                if (xArray[i] == value) {
                    check = true
                }
            }
    
            if (check == false) {
    
                xArray.push(value);
            }
    
        }
        return xArray;
    },
    
    yArray: () => {
        let yArray = []
        let feederArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
        while (yArray.length < 10) {
            let value = feederArray[Math.floor(Math.random() * 10)]
            let check = false;
            for (let i = 0; i < yArray.length; i++) {
                if (yArray[i] == value) {
                    check = true
                }
            }
    
            if (check == false) {
    
                yArray.push(value);
            }
    
        }
        return yArray;
    
    },
    
    squaresPreSet: () => {
    
        let squareArray = [];
        for (var i = 0; i < 100; i++) {
            let squareSeed =
            {
                _id: "",
                name: "OPEN",
                active: true,
                color: ""
    
            };
            squareArray.push(squareSeed)
            squareArray[i]._id = "" + i;
        }

        return squareArray;
    
    }

}