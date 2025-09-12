import { client } from "../apollo/apolloClient";
import { GET_APPOINTMENT } from "../apollo/Query";
import { useSelector } from "react-redux";

export async function getappointment() {
  const { user } = useSelector((state) => state.auth);
  // console.log(parseInt(user?.id));
  const userId = parseInt(user?.id);
  try {
    const { data, loading, error } = await client.query({
      query: GET_APPOINTMENT,
      variables: {
        myAppointmentsId: userId,
      },
      fetchPolicy: "network-only",
    });
    console.log(data);
    return { data };
  } catch (error) {
    throw new Response("Fetching data error ", { status: 500 });
  }
}
