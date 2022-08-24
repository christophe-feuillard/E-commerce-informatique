
export const Trash = (id, setStore, store) => {
 
    const filtered = store.filter(item => 
    item.id != id
    );
    setStore(filtered)
}