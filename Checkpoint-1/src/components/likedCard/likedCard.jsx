import { useState } from "react";

const LikedCard = ({data, setLikedBooks, likedBooks}) => {
    const [bookData, setBookData] = useState(data);

    return(
        <div className="book-card">
            <h3>{bookData.title}</h3>
            <p>{bookData.author_name}</p>
            {bookData.first_publish_year && <p>{bookData.first_publish_year}</p>}
            <div>
                <p>Status: {bookData.status}</p>
                <p>Notes:</p>
                <p>{bookData.notes}</p>
            </div>
            <form className="edit-book" onSubmit={(e) => {
                e.preventDefault()

                setLikedBooks(likedBooks.map((book) => book.id === bookData.id ? bookData : book))
            }}>
                <select name="status" id="book-status" onChange={(e) => setBookData({...bookData, status: e.target.value})}>
                    <option value="pending">Pending</option>
                    <option value="reading">Reading</option>
                    <option value="finished">Finished</option>
                </select>
                <input type="text" onChange={(e) => setBookData({...bookData, notes: e.target.value})} value={bookData.notes}/>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => setLikedBooks(likedBooks.filter((book) => book.id !== bookData.id))}>Unlike</button>
        </div>
    )
};

export default LikedCard;