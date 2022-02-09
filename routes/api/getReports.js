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

var oneMonthBefore = new Date(addedDate.setDate(addedDate.getDate() - 30));
    var mdd = String(oneMonthBefore.getDate()).padStart(2, '0');
    var mmm = String(oneMonthBefore.getMonth() + 1).padStart(2, '0'); //January is 0!
    var myyyy = oneMonthBefore.getFullYear();
    var mcreatedTimestamp = mmm + '/' + mdd + '/' + myyyy;

router.get('/', async (req, res) => {
    try{
        const order = await Order.find({ 
                createdTimestamp:{
                '$lte': createdTimestamp,
                '$gte': lcreatedTimestamp
                }
        }, "totalPrice").select('-_id');

        const len = order.length;
        let TotalPriceWeek = 0;
        
        for (let i = 0; i < len; i++) {
            TotalPriceWeek = parseInt(TotalPriceWeek) + parseInt(order[i].totalPrice);
        }

        const order1 = await Order.find({ 
            createdTimestamp:{
            '$lte': createdTimestamp,
            '$gte': mcreatedTimestamp
            }
    }, "totalPrice").select('-_id');

    const len1 = order1.length;
    let TotalPriceMonth = 0;
        
        for (let i = 0; i < len1; i++) {
            TotalPriceMonth = parseInt(TotalPriceMonth) + parseInt(order1[i].totalPrice);
        }

        var reports = [];

        reports[0] = TotalPriceWeek;
        reports[1] = len;
        reports[2] = TotalPriceMonth;

        

        res.json(reports);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;