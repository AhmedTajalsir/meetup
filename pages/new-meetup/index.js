// our-domain.com/new-meetup
import Head from 'next/head';
import {useRouter} from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function Index() {

    const router = useRouter()

   async function addMeetupHandler(metupdata) {
        // console.log(metupdata);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(metupdata),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          const data = await response.json();
      
          console.log(data);
      
          router.push('/');
    }
    return (
        <div>
            <Head>
            <title>Add New Meetup</title>
                <meta 
                name="description"
                content="Add your own meetups and create amazing networking opportunities!" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </div>
    )
}

export default Index
