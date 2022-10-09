class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            }
        }:{};
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}
        //Removing Some field from category
        const removeFields  = ["keyword","page","limit"]
        // console.log(queryCopy)
        removeFields.forEach((key)=> delete queryCopy[key])
/// Filter for price and ratings

// console.log(queryCopy)

let queryStr = JSON.stringify(queryCopy)
queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))

      
       
        return this;
    }
}

module.exports = ApiFeatures