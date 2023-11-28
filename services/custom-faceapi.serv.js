var { db } = require('../firebase');

class CustomFaceapiService {

    constructor( ){ }
    
    async create(data){

        const result = await db.collection("persons").add(data);
        return result;
    }

    async findOne(id){
        const doc = db.collection('persons').doc(id);
        const item = await doc.get()
        const response = item.data();
        return response;
    }

    async findAll(){
        const result = await db.collection("persons").get();

        let docs = result.docs;
        const response = docs.map((doc) => (doc.data()));

        return response;
    }


}

module.exports = CustomFaceapiService;