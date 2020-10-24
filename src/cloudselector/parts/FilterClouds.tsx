import React, { useState, useEffect } from 'react';

export function FilterClouds(props) {
    const [cloudButtons, setCloudButtons] = useState([])

    function createCloudButtons(clouds){
        console.log(clouds)
    }

    useEffect(() => {
        if (props.allClouds){
            createCloudButtons(props.allClouds)
        }
    }, [props.allClouds])

    return (
        <div>
            {cloudButtons}
            Cloudselection
        </div>
    );
}
