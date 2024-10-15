import { useStorage } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  
  const token = useStorage("token", "")
  const user = useStorage("user", {} as any)
  
  const login = (authData: any) => {
    // console.log("authData:", authData); // 打印 authData 检查内容
    const { token: authToken, ...u } = authData;
  
    // console.log("Extracted user info:", u);
    // console.log("Extracted token:", authToken);
  
    token.value = authToken; // 设置 token
    user.value = u; // 设置 user
  }

  const logout = () => {
    token.value = null;
    user.value = null;
  }

  const uid = computed(() => {return user.value.id});
  const uniqueId = computed(() => {return user.value.uniqueId});
  const ifLogin = computed(() => !!token.value)
  
  return {
    token,
    user,

    login,
    logout,

    uid,
    uniqueId,
    ifLogin,
  }
})
// export const useAuthStore = defineStore('auth', () => {
//   /**
//    * Current name of the auth.
//    */

//   const token = ref('')
//   const loginStatus = ref(0)
//   let user:any = reactive({})
//   // const previousNames = ref(new Set<string>())

//   // const usedNames = computed(() => Array.from(previousNames.value))
//   // const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

//   /**
//    * Changes the current name of the auth and saves the one that was used
//    * before.
//    *
//    * @param name - new name to set
//    */
//   // function setNewName(name: string) {
//   //   if (savedName.value)
//   //     previousNames.value.add(savedName.value)

//   //   savedName.value = name
//   // }

//   function setLoginStatus(status: number) {
//     loginStatus.value = status
//   }

//   function setUser(u: any) {
//     user = u
//   }

//   function login(u: any) {
//     user = u;
//     token.value = u.token;
//     localStorage.setItem("token", token.value)
//   }

//   const uid = computed(() => user?.id || 0);

//   return {
//     // setNewName,
//     // otherNames,
//     token,
//     loginStatus,
    
//     setLoginStatus,
//     setUser,
//     login,

//     uid,
//   }
// })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore as any, import.meta.hot))
