export function adaptive() {
    const left = document.getElementById('tb-left');
    const right = document.getElementById('tb-right');


    let currentWidth = window.screen.width;
    let tr = document.querySelectorAll('tr');

    let currentPage = 1;
    let prevPage = 0;

    window.addEventListener('resize', () => {
        currentWidth = window.screen.width;
        console.log(currentPage);
    });

    if (currentWidth < 1224) {
        for (let i = 0; i < tr.length; i++) {
            tr[i].children[1].style.display = 'none';
            tr[i].children[2].style.display = 'none';
            tr[i].children[3].style.display = 'none';
            tr[i].children[4].style.display = 'none';
            tr[i].children[5].style.display = 'none';

            switch (currentPage) {
                case 1:
                    tr[i].children[currentPage].style.display = 'table-cell';
                    break;
            }
        }

        right.addEventListener('click', () => {
            if (currentPage > 4) {
                currentPage = 5;
            } else {
                currentPage++;
            }
        });

        left.addEventListener('click', () => {
            if (currentPage < 4) {
                currentPage = 1;
            } else {
                currentPage--;
            }
        });

        window.addEventListener('click', (event) => {
            if (event.target == right || event.target == left) {
                for (let i = 0; i < tr.length; i++) {
                    tr[i].children[1].style.display = 'none';
                    tr[i].children[2].style.display = 'none';
                    tr[i].children[3].style.display = 'none';
                    tr[i].children[4].style.display = 'none';
                    tr[i].children[5].style.display = 'none';

                    switch (currentPage) {
                        case 1:
                            tr[i].children[1].style.display = 'table-cell';
                            break;

                        case 2:
                            tr[i].children[2].style.display = 'table-cell';
                            break;

                        case 3:
                            tr[i].children[3].style.display = 'table-cell';
                            break;

                        case 4:
                            tr[i].children[4].style.display = 'table-cell';
                            break;

                        case 5:
                            tr[i].children[5].style.display = 'table-cell';
                            break;

                    }
                }
            }
        });
    }
}