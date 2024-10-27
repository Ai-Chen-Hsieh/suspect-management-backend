const mongoose = require('mongoose')
const Suspect = require('../suspect') 
const axios = require('axios');
const states = ['arrested', 'wanted', 'released', 'normal'];

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


(async () => {
  try {
    // 連接到 MongoDB
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('mongodb connected!');

    const response = await axios.get('https://randomuser.me/api/?results=16&seed=seed&inc=gender,name,dob,picture');
    const results = response.data.results;

    const data = results.map((item) => {
      const randomStatus = states[Math.floor(Math.random() * states.length)];

      return {
      name: `${item.name.first} ${item.name.last}`,
      age: item.dob.age,
      gender: item.gender,
      status: randomStatus,
      arrestedCount: Math.floor(Math.random() * 21),
      avatar: item.picture.large,
      priority: randomStatus === 'wanted' ? true : Math.floor(Math.random() * 20) % 2 === 0 ? true : false,
    }});

    // 插入資料
    await Suspect.insertMany(data);
    console.log('資插料入完成');
  } catch (error) {
    // 判斷錯誤類型
    if (error instanceof mongoose.Error) {
      console.error('MongoDB 錯誤:', error);
    } else if (error.isAxiosError) {
      console.error('Axios 錯誤:', error);
    } else {
      console.error('其他錯誤:', error);
    }
  } finally {
    mongoose.connection.close();
  }
})();
