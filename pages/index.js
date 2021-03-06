import  Head  from 'next/head'
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
    //  console.log(props.meetups);
    return (
        <div>
            <Head>
                <title>Meetup App</title>
                <meta 
                name="description"
                content="Browser a huge list of highly active React Meetups!" />
            </Head>
             <MeetupList meetups={props.meetups}/>
        </div>
    )
}

// export async function getServerSideProps(context){
//     const req = context.req
//     const res = context.res
// // fetch data from API
// return {
//     props: {
//         meetups: DUMMY_DATA
//     }
// }
// }

export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect(
        'mongodb+srv://ahmed:test123@cluster0.irk3n.mongodb.net/meetups?retryWrites=true&w=majority'
      );
      const db = client.db();
  
      const meetupsCollection = db.collection('meetups');

      const meetups = await meetupsCollection.find().toArray()
      client.close()
    return {
        props: {
            meetups: meetups.map(meetup =>({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage
