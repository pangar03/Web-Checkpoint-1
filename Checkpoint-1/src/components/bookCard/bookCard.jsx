const BookCard = ({bookData, setLikedBooks, likedBooks, id, setId}) => {
    console.log("BOOK: ", bookData)

    return(
        <div className="book-card">
            <h3>{bookData.title}</h3>
            <p>{bookData.author_name}</p>
            {bookData.first_publish_year && <p>{bookData.first_publish_year}</p>}
            <button onClick={() => {
                setLikedBooks([...likedBooks, {...bookData, status: "pending", notes: "", id: id + 1}])
                setId(id + 1);
            }}>Like</button>
        </div>
    )
};

export default BookCard;