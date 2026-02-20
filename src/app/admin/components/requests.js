import { UpdateRequests, DeleteRequests } from "../requests";
export default function Requests({ requests }) {

    return (
        <section>
            <h1>заявки</h1>

            <ul>
                {requests.map(request => (
                    <li key={request.id} style={{ marginTop: 10 }} className='requestsRess'>


                        <form className='formRess' action={UpdateRequests} style={{ display: 'inline' }}>
                              <input type="hidden" name="id" value={request.id} />

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{request.title}</span>
                                <span>{request.description}</span>
                                <span>{request.budget}</span>
                                <span>{request.first_name}</span>
                                <span>{request.last_name}</span>
                                <span>{request.email}</span>
                                <span>{request.phone}</span>
                            </div>
                            <select name="status" defaultValue={request.status}>
                                <option value="new">new</option>
                                <option value="review">В рассмотрении</option>
                                <option value="in_progress">В разработке</option>
                                <option value="paid">Оплачено</option>
                            </select>
                            <button>💾</button>
                        </form>

                        <form className='formRess' action={DeleteRequests}>
                            <input type="hidden" name="id" value={request.id} />
                            <button>❌</button>
                        </form>

                    </li>
                ))}
            </ul>
        </section>
    );
}
