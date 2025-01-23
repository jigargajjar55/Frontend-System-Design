

const createHTMLElementObj = (tag) =>{

    const elementObj = document.createElement(tag);
   
    elementObj.addEventListener("click", function(event){

        event.stopPropagation();
        const childs = this.children;

        for(let i=0; i<childs.length; i++){

            const child = childs[i];

            if (child.style.display === "block") {
                child.style.display = "none";
              } else {
                child.style.display = "block";
              }
        }


    })
    

    return elementObj;

}



const buildTreeObj = (paths) => {

    const folder = {};

    paths.map((path,index) => {

        const fileArr = path.split("/");
        let currFolder = folder;

        fileArr.map((file, ind) => {

            if(!currFolder[file]){
                currFolder[file] = {};
            }

            currFolder = currFolder[file];

        });

    });

    return folder;
}

const renderTree = function(root){

    const ulElement = createHTMLElementObj('ul'); 
    ulElement.style.display = "block";

    for(const childFolder in root){

        const li = createHTMLElementObj('li');
        li.style.display = "block";
        li.textContent = childFolder;
        

        if(Object.keys(root[childFolder]).length > 0){  
            
            const childTree = renderTree(root[childFolder]);
           
            li.appendChild(childTree);
        }
        
        if(childFolder.indexOf(".") > -1){
            li.classList.add('file');
        }
        ulElement.appendChild(li);
    }

    return ulElement;


}

// Example usage:
const paths = [
    '/home/user/documents/file1.txt',
    '/home/user/documents/file2.txt',
    '/home/user/photos/photo1.jpg',
    '/home/user/photos/photo2.jpg',
    '/var/log/system.log',
    '/file.txt',
    '/var/log/folder23'
];

const folderTreeObj = buildTreeObj(paths);
const folderHTMLObj = document.getElementById("Folders");
folderHTMLObj.appendChild(renderTree(folderTreeObj));


