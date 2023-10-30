const game = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

window.onload = start  

function start()
{
    setupTable()
    startGame()
}

function setupTable()
{
    const table = document.createElement("table")

    for (let i=0; i<4;i++)
    {
        let row = document.createElement("tr")
        for (let j=0; j<4;j++)
        {
            let col = document.createElement("td")
            row.appendChild(col)
        }
        table.appendChild(row)
    }

    document.body.appendChild(table)
}

function startGame()
{
    addTwo()
    updateGUI()
    addListeners()
    updateScore()
}

function addTwo()
{
    let row = Math.floor(Math.random() * 4)
    let col = Math.floor(Math.random() * 4)
    while (game[row][col] != 0)
    {
        row = Math.floor(Math.random() * 4)
        col = Math.floor(Math.random() * 4)
    }

    game[row][col] = 2

    while (game[row][col] != 0)
    {
        row = Math.floor(Math.random() * 4)
        col = Math.floor(Math.random() * 4)
    }

    game[row][col] = 2

}

function updateGUI()
{
    const table = document.getElementsByTagName('table')[0]
    for (let i = 0; i<4 ;i++)
    {
        for (let j = 0; j<4 ; j++)
        {
            if (game[i][j] == 0)
            {
                table.children[i].children[j].innerText = ""
                table.children[i].children[j].classList.value = ""
            }
            else if (game[i][j] <= 8192)
            {
                table.children[i].children[j].innerText = game[i][j]
                table.children[i].children[j].classList.value = ""
                table.children[i].children[j].classList.add('x' + game[i][j])
            }
        }
    }
}


function addListeners()
{
    document.addEventListener('keyup', (e) => 
    {
        if (e.code == 'ArrowLeft')
            shiftLeft()
        if (e.code == 'ArrowRight')
            shiftRight()
        if (e.code == 'ArrowUp')
            shiftUp()
        if (e.code == 'ArrowDown')
            shiftDown()
        updateGUI()
        updateScore()
    })
}

function shiftLeft()
{
    let change = 0
    for (let i = 0; i<4; i++)
    {
        let new_row = []
        for (let j = 0; j<4; j++)
        {
            if (game[i][j] != 0)
                new_row.push(game[i][j])
        }
        let j = 0
        while (j < new_row.length-1)
        {
            if (new_row[j] == new_row[j+1])
            {
                new_row[j]+=new_row[j+1]
                new_row.splice(j+1,1)
            }
            j++;
        }
        while (new_row.length < 4)
        {
            new_row.push(0)
        }

        for (let j = 0; j<4; j++)
        {
            if (game[i][j] != new_row[j])
            {
                change++;
                game[i][j] = new_row[j]
            }
        }
    }
    if (change != 0 && !gameOver())
    {
        addTile()
        updateGUI()
    }
    else if (gameOver())
    {
        window.alert("Game over")
    }
}

function shiftRight()
{
    let change = 0
    for (let i = 0; i<4; i++)
    {
        let new_row = []
        for (let j = 0; j<4; j++)
        {
            if (game[i][j] != 0)
                new_row.push(game[i][j])
        }
        let j = new_row.length 
        while (j > 0)
        {
            if (new_row[j] == new_row[j-1])
            {
                new_row[j]+=new_row[j-1]
                new_row.splice(j-1,1)
            }
            j--;
        }
        while (new_row.length < 4)
        {
            new_row = [0, ...new_row]
        }

        for (let j = 0; j<4; j++)
        {
            if (game[i][j] != new_row[j])
            {
                change++;
                game[i][j] = new_row[j]
            }
        }
    }

    if (change != 0 && !gameOver())
    {
        addTile()
        updateGUI()
    }
    else if (gameOver())
    {
        window.alert("Game over")
    }
        
}

function shiftUp()
{
    let change = 0
    for (let i = 0; i<4; i++)
    {
        let new_col = []
        for (let j = 0; j<4; j++)
        {
            if (game[j][i] != 0)
                new_col.push(game[j][i])
        }
        let j = 0
        while (j < new_col.length-1)
        {
            if (new_col[j] == new_col[j+1])
            {
                new_col[j]+=new_col[j+1]
                new_col.splice(j+1,1)
            }
            j++;
        }
        while (new_col.length < 4)
        {
            new_col.push(0)
        }

        for (let j = 0; j<4; j++)
        {
            if (game[j][i] != new_col[j])
            {
                game[j][i] = new_col[j]
                change++
            }
        }
    }

    if (change != 0 && !gameOver())
    {
        addTile()
        updateGUI()
    }
    else if (gameOver())
    {
        window.alert("Game over")
    }
}

function shiftDown()
{
    let change = 0
    for (let i = 0; i<4; i++)
    {
        let new_col = []
        for (let j = 0; j<4; j++)
        {
            if (game[j][i] != 0)
            new_col.push(game[j][i])
        }
        let j = new_col.length-1
        while (j > 0)
        {
            if (new_col[j] == new_col[j-1])
            {
                new_col[j]+=new_col[j-1]
                new_col.splice(j-1,1)
            }
            j--;
        }
        while (new_col.length < 4)
        {
            new_col = [0, ...new_col]
        }
        
        for (let j = 0; j<4; j++)
        {
            if (game[j][i] != new_col[j])
            {
                game[j][i] = new_col[j]
                change++
            }
        }
    }

    if (change != 0 && !gameOver())
    {
        addTile()
        updateGUI()
    }
    else if (gameOver())
    {
        window.alert("Game over")
    }
}


function addTile()
{
    let random = Math.random()
    let choice = 2
    if (random < 0.5)
        choice = 4

    let row = Math.floor(Math.random() * 4)
    let col = Math.floor(Math.random() * 4)

    while(game[row][col] != 0)
    {
        row = Math.floor(Math.random() * 4)
        col = Math.floor(Math.random() * 4)
    }

    game[row][col] = choice
}

function updateScore()
{
    let score = 0
    for (let i = 0; i<4; i++)
    {
        for (let j = 0; j<4;j++)
        {
            score += game[i][j]
        }
    }
    document.getElementById('score').innerText = `Score: ${score}`
}

function gameOver()
{
    for (let i = 0; i<4; i++)
    {
        for (let j = 0; j<4;j++)
        {
            if (game[i][j] == 0)
                return false
        }
    }
    return true
}