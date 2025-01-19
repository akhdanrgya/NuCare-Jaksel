import React from "react";

interface YoutubeEmbedProps {
    videoId: string;
}

const YoutubeVideoFrame: React.FC<YoutubeEmbedProps> = ({ videoId }) => {
    return (
        <div
            style={{
                position: "relative",
                width: "100%", // match parent
                paddingBottom: "56.25%", // aspect ratio 16:9
            }}
        >
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
            />
        </div>
    );
};


export default YoutubeVideoFrame;
