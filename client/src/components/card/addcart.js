
import { GetGlobalData } from '../../useContext/AuthProviders';

export const handleStore = (articles) => {
    const {contextStore} = GetGlobalData();
    const [store, setStore] = contextStore;

    const foundArticleInLocalStorage = store.find(element => element.id === articles.id);
    if (foundArticleInLocalStorage ) {
     setStore(
       store.map((item, key) => item.id == articles.id ? {...articles, quantity:foundArticleInLocalStorage.quantity + 1}: item)
      )
    } else {
     setStore([...store, {...articles, quantity: 1}])
    }
 
   }