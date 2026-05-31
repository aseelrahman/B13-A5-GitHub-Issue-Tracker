const modal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url)
    const rawData = await res.json()
    const data = rawData.data

    const modalBox = document.getElementById('modal-detail-container')
    modalBox.innerHTML = `
    <h3 class="text-2xl font-bold">${data.title}</h3>

          <p><span
              class="text-[14px] py-1 px-4 rounded-full font-medium ${data.status === 'open'? 'bg-[#00A96E] text-[#ffffff]': data.status ==='closed'? 'bg-[#A855F7] text-[#ffffff]': ''}"
              >${data.status.toUpperCase()}</span
            > by ${data.assignee === ''? 'Not Assigned': data.assignee} on ${new Date (data.updatedAt).toLocaleDateString()}</p>

          <div class="flex flex-wrap gap-1 justify-start items-center mt-3">
             
              ${data.labels.map(label =>{
                return label ==='bug'? `<span
                class="text-[12px] p-[6px] font-medium border border-[#FECACA] bg-[#FEECEC] text-[#EF4444] rounded-full"
                ><i class="fa-solid fa-bug"></i> ${label.toUpperCase()}</span>`
                : label === 'help wanted'? `<span
                class="text-[12px] p-[6px] font-medium border border-[#FDE68A] bg-[#FFF8DB] text-[#D97706] rounded-full"
                ><i class="fa-solid fa-handshake-angle"></i> ${label.toUpperCase()}</span>`
                : label === 'enhancement' ? `<span
                class="text-[12px] p-[6px] font-medium border border-[#BBF7D0] bg-[#DEFCE8] text-[#00A96E] rounded-full"
                ><i class="fa-solid fa-bahai"></i> ${label.toUpperCase()}</span>`
                : `<span
                class="text-[12px] p-[6px] font-medium border border-[#bbdef7] bg-[#def9fc] text-[#002da9] rounded-full"
                ><i class="fa-solid fa-bahai"></i> ${label.toUpperCase()}</span
              >`
              }).join('')}
            </div>

          <p class="text-[12px] text-[#64748B]">
                ${data.description}
              </p>

          <div class="grid grid-cols-2 bg-[#F8FAFC] p-4 rounded-lg">
            <div>
              <h6 class="text-[#64748B]">Assignee: </h6>
              <p class="font-semibold">${data.assignee === ''? 'Not Assigned': data.assignee}</p>
            </div>
            <div>
              <h6 class="text-[#64748B]">Priority: </h6>
             <span
              class="text-[14px] py-1 px-4 rounded-full font-medium ${data.priority === 'high'? 'bg-[#ff3535] text-[#ffffff]': data.priority ==='medium'? 'bg-[#F59E0B] text-[#ffffff]':  data.priority === 'low' ? 'bg-[#9CA3AF] text-[#ffffff]': ''}"
              >${data.priority.toUpperCase()}</span
            >
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary">Close</button>
            </form>
          </div>
    `
    document.getElementById('my_modal').showModal()
    
}