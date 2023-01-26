import { useState, useEffect } from "react";


export const useOneUser = (url) => {
    
    const [state, setState] = useState({
      dataUser : null,
      isLoadingUser : true
    });
    
    useEffect(() => {
        setState({
            ...state,
            isLoadingUser : true,
          });

        fetch(url)
        .then(res => res.json())
        .then(dataApi => setState({
            dataUser : dataApi ,
            isLoadingUser : false,
        }))
        .catch(err =>{
            setState({
                dataUser : null,
                isLoadingUser : false,
            })
        })
        
    }, [url])

    return {
        dataUser: state.dataUser,
        isLoadingUser: state.isLoadingUser,
    }

    
}

export default useOneUser