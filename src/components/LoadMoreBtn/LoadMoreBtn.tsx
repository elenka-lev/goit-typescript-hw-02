type LoadBtn = {
    onClick(): void;
}

const LoadMoreBtn = ({ onClick }  : LoadBtn) => {
    return (
        
            <button type='submit' onClick={onClick}>Load more</button>
        
    )
}

export default LoadMoreBtn;