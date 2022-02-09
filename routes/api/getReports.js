const express = require('express');
const router = express.Router();
const config = require('config');
const Order = require('../../models/model_order'); 

var addedDate = new Date();
    var dd = String(addedDate.getDate()).padStart(2, '0');
    var mm = String(addedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = addedDate.getFullYear();
    var createdTimestamp = mm + '/' + dd + '/' + yyyy;

var oneWeekBefore = new Date(addedDate.setDate(addedDate.getDate() - 7));
    var ldd = String(oneWeekBefore.getDate()).padStart(2, '0');
    var lmm = String(oneWeekBefore.getMonth() + 1).padStart(2, '0'); //January is 0!
    var lyyyy = oneWeekBefore.getFullYear();
    var lcreatedTimestamp = lmm + '/' + ldd + '/' + lyyyy;

router.get('/', async (req, res) => {
    try{
        const order = await Order.find({ 
                createdTimestamp:{
                '$lte': createdTimestamp,
                '$gte': lcreatedTimestamp
                }
        }, "totalPrice").select('-_id');

        const len = order.length;
        let TotalPrice = 0;
        
        for (let i = 0; i < len; i++) {
            TotalPrice = parseInt(TotalPrice) + parseInt(order[i].totalPrice);
        }

        

        res.json(TotalPrice);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;