import './Gifcard.scss'

export const GifCard = ({ img, title, url, onRemove }) => {
    return (
        <div className="card">
            <img src={url} alt={title}/>
            <div >
                <p>{title}</p>
                <i className="fa-solid fa-delete-left" onClick={onRemove}></i>
            </div>
        </div>
    );
};