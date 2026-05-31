const activeBtn = () =>{
    document.getElementById('all').addEventListener(
        'click', ()=>{
            document.querySelectorAll('active').classList.remove('active')
            document.getElementById('all').classList.add('active')
            allIssues()
        }
    )
    document.getElementById('open').addEventListener(
        'click', ()=>{
            document.querySelectorAll('active').classList.remove('active')
            document.getElementById('open').classList.add('active')
            allIssues().map()
        }
    )
    document.getElementById('all').addEventListener(
        'click', ()=>{
            document.querySelectorAll('active').classList.remove('active')
            document.getElementById('closed').classList.add('active')
            allIssues()
        }
    )
}