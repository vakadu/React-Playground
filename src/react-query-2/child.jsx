import { useEffect, useState } from "react";
import { getData } from "./api";
import useQuery from "./use-query";

async function getUsers() {
    const response = await getData();
    return response
}

function Reply({reply, editReply}) {
    return(
        <div style={{marginLeft: 12}}>
            <div>{reply.author}</div>
            <div onDoubleClick={() => editReply(reply.id)}>{reply.comment}</div>
            {reply.replies?.map((r) => <Reply reply={r} editReply={editReply}/>)}
        </div>
    )
}

export default function Child() {
    const { data, loading, refetch } = useQuery('/api/users', getUsers);
    const [userData, setUserData] = useState(data);    

    useEffect(() => {
        setUserData(data)
    }, [data]);

    function editReply(id) {}

    if(loading) {
        return <div>Loading...</div>
    }

    return(
        <div>
            {
                userData?.map((user) => {
                    return(
                        <div key={user.id} style={{marginBottom: 16}}>
                            <div>{user.author}</div>
                            <div>{user.comment}</div>
                            {
                                user.replies?.map((reply) => {
                                    return <Reply reply={reply} key={reply.id} editReply={editReply}/>
                                })
                            }
                        </div>
                    )
                })
            }
            
            <button onClick={() => refetch()}>Reftch</button>
        </div>
    )
}
