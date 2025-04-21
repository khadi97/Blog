function deleteBlogs(id, authorID){
    axios.delete(`/api/blogs/${id}`).then(data => {
        if(data.status == 200){
            location.replace(`/my_blogs/${authorID}`)
        }
        else  if(data.status == 200){
            location.replace('/not_found')
        }
    })
}