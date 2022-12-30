const KEY = "redux";

// s'il n'y a pas d'état, cela retourne undefined, sinon on retourne l'état
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

// on prend un state, on le stringify, et on le sauvegarde dans le localstorage
export async function saveState(state: any) {
  try {
    if(state.auth.token){
    const serializedState = JSON.stringify(state);
      localStorage.setItem(KEY, serializedState);
    }
    // console.log(serializedState);
    
  } catch (e) {
    // Ignore
  }
}