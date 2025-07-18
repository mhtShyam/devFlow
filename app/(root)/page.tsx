import {Button} from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";

const questions = [
    {
        _id:"1",
        title:"How to learn React?",
        description:"I want to learn React?",
        tags:[{
            _id:"1",name:"React"
        },{
            _id:"2",name:"JavaScript"
        }],
        author:{_id:"1", name:"John Doe", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Jf7L1uLyKL81OhzN2fk-x0OSKXABNLEZYg&s"},
        upvotes:10,
        answers:5,
        views:100,
        createdAt: new Date(),
    },
    {
        _id:"2",
        title:"How to learn JavaScript?",
        description:"I want to learn JavaScript?",
        tags:[{
            _id:"1",name:"JavaScript"
        },{
            _id:"2",name:"React"
        }],
        author:{_id:"1", name:"John Doe", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Jf7L1uLyKL81OhzN2fk-x0OSKXABNLEZYg&s"},
        upvotes:10,
        answers:5,
        views:100,
        createdAt: new Date(),
    }
]

interface SearchParams{
    searchParams:Promise<{[key:string]:string}>
}

const Home = async({searchParams}:SearchParams) => {
    const {query="", filter=""} = await searchParams;
    const filterdQuestions = questions.filter((q)=> {
        const matchesQuery = q.title.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = filter ? q.tags[0].name.toLowerCase() === filter.toLowerCase() : true;

        return matchesQuery && matchesFilter;
    })
    return (
       <>
           <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
               <h1 className="h1-bold text-dark100_light900">All Questions</h1>
               <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900" asChild>
                   <Link href={ROUTES.ASK_QUESTION}>Ask a Questions</Link>
               </Button>
           </section>
           <section className="mt-11">
               <LocalSearch route="/" imgSrc='/icons/search.svg' placeholder='Search...' otherClasses="flex-1"/>
           </section>
           <HomeFilter/>
           <div className="mt-10 flex flex-col w-full gap-6">
               {filterdQuestions.map(question => (
                   <QuestionCard key={question._id} question={question} />
               ))}
           </div>
       </>
    )
}
export default Home
