export const deleteData = async (endPoint) => {
    const c = confirm("Are you sure you want to delete this category?");
    if (!c) {
        return false;
    }

    try {
        const response = await fetch(endPoint, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        
        const data = await response.json();
        console.log('Delete successful:', data);

        return true;
    } catch (error) {
        console.error('Delete failed:', error);
        return false;
    }
};
