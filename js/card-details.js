const loadIssues = async (status = "all") => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();

  let issues = data.data;

  if (status !== "all") {
    issues = issues.filter((issue) => issue.status === status);
  }

  const issueCount = document.getElementById("count");

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  issues.forEach((data) => {
    const card = document.createElement("div");

    card.innerHTML = `
        <div onclick="modal(${data.id})"
          class="w-[256px] bg-[#FFFFFF] rounded p-4 border-t-4  ${data.status === "open" ? "border-[#00A96E]" : data.status === "closed" ? "border-[#A855F7]" : ""}"
        >
          <div class="flex justify-between mb-3">
            <span><img src="${data.status === "open" ? "assets/Open-Status.png" : data.status === "closed" ? "assets/Closed- Status .png" : ""}"/></span>
            <span
              class="text-[14px] w-[80px] flex justify-center items-center rounded-full font-medium ${data.priority === "high" ? "bg-[#FEECEC] text-[#EF4444]" : data.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : data.priority === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : ""}"
              >${data.priority.toUpperCase()}</span
            >
          </div>
          <div class="mb-4">
            <div>
              <h3 class="font-semibold text-[14px]">
                ${data.title}
              </h3>
              <p class="text-[12px] text-[#64748B] line-clamp-2">
                ${data.description}
              </p>
            </div>
            <div class="flex flex-wrap gap-1 justify-start items-center mt-3">
             
              ${data.labels
                .map((label) => {
                  return label === "bug"
                    ? `<span
                class="text-[12px] p-[6px] font-medium border border-[#FECACA] bg-[#FEECEC] text-[#EF4444] rounded-full"
                ><i class="fa-solid fa-bug"></i> ${label.toUpperCase()}</span>`
                    : label === "help wanted"
                      ? `<span
                class="text-[12px] p-[6px] font-medium border border-[#FDE68A] bg-[#FFF8DB] text-[#D97706] rounded-full"
                ><i class="fa-solid fa-handshake-angle"></i> ${label.toUpperCase()}</span>`
                      : label === "enhancement"
                        ? `<span
                class="text-[12px] p-[6px] font-medium border border-[#BBF7D0] bg-[#DEFCE8] text-[#00A96E] rounded-full"
                ><i class="fa-solid fa-bahai"></i> ${label.toUpperCase()}</span>`
                        : `<span
                class="text-[12px] p-[6px] font-medium border border-[#bbdef7] bg-[#def9fc] text-[#002da9] rounded-full"
                ><i class="fa-solid fa-bahai"></i> ${label.toUpperCase()}</span
              >`;
                })
                .join("")}
            </div>
          </div>
          <hr class="border-[#E4E4E7] border-1" />
          <div class="mt-4">
            <p class="text-[12px] text-[#64748B]">#${data.id} by ${data.author}</p>
            <p class="text-[12px] text-[#64748B]">${new Date(data.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        `;
    cardContainer.appendChild(card);
    issueCount.innerText = issues.length;
  });
};

loadIssues();

document.querySelectorAll("[data-status]").forEach((button) => {
  button.addEventListener("click", (e) => {
    status = e.target.dataset.status;
    document.querySelectorAll("[data-status]").forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    loadIssues(status);
  });
});
