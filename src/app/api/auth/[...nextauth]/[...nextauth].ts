
import CredentialsProvider from 'next-auth/providers/credentials';
import { AxiosInstance } from '@/lib/axios';
import NextAuth from 'next-auth/next';


const authOption = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label:'Password',
                    type:'password'
                }
            },
            async authorize(credentials, req) {
              try{
                const res = await  AxiosInstance.post('/auth/login', credentials);
                if(res.status == 200){
                    const user = {token: res.data.token, userid: res.data.user.id}
                    sessionStorage.setItem("token", user.token)
                    return user.token
                } else {
                    return null
                }
              }
              catch(err){
                console.log(err)
                return null;
              }
              
            }
        })
    ],

    callbacks: {
       async session  ({session, user, token}) {
            return session
        }
    }
   
})
