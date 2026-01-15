import { PostBirdForm } from "../postBirdsComponents/PostBirdForm"
import { PostedBirdList } from "../postBirdsComponents/postedBirdsList"

export const AdminPage = () => {
    return (
        <div>
            <PostBirdForm />
            <div>
                <PostedBirdList />
            </div>
        </div>
    )
}