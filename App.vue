<template>
 <div v-show="!isEditMode" id="main">
            <h1>user profile</h1>
            <img :src="image">
            <p>name:<b id="main-name">{{ name }}</b></p>
            <hr>
            <p>email:<b id="main-email">{{ email }}</b></p>
            <hr>
            <p>interest:<b id="main-interest">{{ interest }}</b></p>
            <hr>
            <button @click="handleeditprofile()">Edit profile</button>
        </div>
        <div  v-show="isEditMode" id="edit">
            <div class="inner">
            <h1>user profile</h1>
            <img class="edit-img" :src="image">
            <span>name:</span><input type="text" id="input-name" v-model="name">
            <hr>
            <span>email:</span><input type="text" id="input-email" v-model="email">
            <hr>
            <span>interest:</span><input type="text"  id="input-interest" v-model="interest">
            <hr>
            <button @click="handleupdateprofile()">update profile</button></div>
        </div>
</template>

<script>
import image from "./images.jpg"
export default {
  name: 'App',
  data(){
  return{ 
  image:image,
  name: "",
  email:"",
  interest:"",
  isEditMode: false
}
  },
  async created(){
    const userdata=await this.fetchuserprofile();
    this.name=userdata.name
    this.email=userdata.email
    this.interest=userdata.interest
  },
  methods:{
  handleeditprofile()
{
    this.isEditMode = true
},
async handleupdateprofile()
{
    const payload={
        name:this.name,
        email:this.email,
        interest:this.interest
    }
    const resjson=await this.updateuserprofile(payload)
    console.log(resjson)
     this.isEditMode = false
},
 async fetchuserprofile()
{
   const res=await fetch("get-profile")
   return await res.json()
},
async updateuserprofile(payload){
    const res=await fetch("update-profile",{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify(payload)
    })
    return await res.json()
}
  }
}
</script>

<style>
body{
    background-color: white;
}
#main{
    width:60%;
    height:100vh;
    margin: auto;
    background: white;
}
button{
    width: 160px;
    font-size: 16px;
    height: 45px;
    border-radius: 5px;
}
button:hover{
    cursor: pointer;
}

.edit-img
{
    display: block;
    margin-bottom: 20px;
}
.edit hr{
    margin-top: 20px;
    margin-bottom: 20px ;
}
input{
    width: 160px;
    height: 20px;
    padding: 10px;
    font-size: 15px;
}
</style>
