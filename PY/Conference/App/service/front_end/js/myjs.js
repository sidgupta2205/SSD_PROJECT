    $(document.body).on('click', '#search' ,function(){
    itr = 0;
    len = 0;


    function buildTable2(data) {
        var table = document.getElementById('myTable')
        var i = 0;
        console.log("len=")
        console.log(len)
        console.log("itr=")
        console.log(itr)
        table.innerHTML = `<tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>`
        for (i = itr; i < len; i++) {
            
            if (typeof data[i].rank == 'undefined')
                data[i].rank='A*'
            if (typeof data[i].rank == 'undefined')
                data[i].rank='A'
        if (typeof data[i].location == 'undefined')
                data[i].location='TBA'
        if (typeof data[i].date == 'undefined')
                data[i].date='TBA'
        if (typeof data[i].map_url == 'undefined')
                data[i].map_url='TBA'
        if (typeof data[i].conf_webiste == 'undefined')
                data[i].conf_webiste='TBA'

            var row = `<tr>
              <td>${data[i].title}</td>
              <td>${data[i].location}</td>
              <td>${data[i].date}</td>
              <td>${data[i].rank}</td>
              <td><a href='${data[i].map_url}' target="_blank">${data[i].map_url}</a></td>
              <td><a href='${data[i].conf_webiste}' target="_blank">Click here</a></td>
            </tr>`
            table.innerHTML += row


        }
    }


    function buildTable(data) {

        var sHead = document.getElementById('searchHead');
        var sContent = `<h2 class="sResult">Search Result</h2><br>`
        sHead.innerHTML = sContent;
        var thead = document.getElementById('tableHead');
        var trow = `<tr id="tableHead" class="bg-info">
                <th class="table-col">Title</th>
                <th class="table-col">Location</th>
                <th class="table-col">Date</th>
                <th class="table-col">Rank</th>
                <th class="table-col">Map</th>
                <th class="table-col">Website</th>
                </tr>`
        thead.innerHTML = trow;
        var table = document.getElementById('myTable')
        var row = '';
        len = data.length;
        myArray = data;
        loopLength = (len > itr+10) ? itr+10 : len;
        for (i = itr; i < loopLength; i++){
            if (typeof data[i].rank == 'undefined')
                data[i].rank='A*'
            if (typeof data[i].rank == 'undefined')
                data[i].rank='A'
           if (typeof data[i].location == 'undefined')
                data[i].location='TBA'
           if (typeof data[i].date == 'undefined')
                data[i].date='TBA'
           if (typeof data[i].map_url == 'undefined')
                data[i].map_url='TBA'
           if (typeof data[i].conf_webiste == 'undefined')
                data[i].conf_webiste='TBA'
            row += `<tr>
                  <td>${data[i].title}</td>
                  <td>${data[i].location}</td>
                  <td>${data[i].date}</td>
                  <td>${data[i].rank}</td>
                  <td><a href='${data[i].map_url}' target="_blank">${data[i].map_url}</a></td>
                  <td><a href='${data[i].conf_webiste}' target="_blank">Click here</a></td>
                </tr>`          
        }
        table.innerHTML = row
        var pndiv = document.getElementById('pndiv');
        var divContent = `<button class="btn btn-primary" id="prev">Prev</button>
            <button class="btn btn-primary" id="next">Next</button>`
        pndiv.innerHTML = divContent;
    }


    /*buildTable(myArray)*/

    $(document.body).on('click', '#prev' ,function(){
            itr = itr - 10;
            buildTable(myArray);
            console.log(itr);
        
   })
    $(document.body).on('click', '#next' ,function(){
        if (itr + 20 < len) {
            itr = itr + 10;
            buildTable(myArray);
            console.log(itr);
        } else if (itr + 10 < len) {
            itr = itr + 10;
            buildTable2(myArray);
            console.log(itr);
        }
    })
    
    const value = document.getElementById('search').value;
    var ipVal=$(".s-content").find('input[type=text]').val();
    fetch('http://localhost:3000/search?q='+ipVal, {
        method: 'GET',
    }).then(function(response) {
        response.json().then(function(text) {
            console.log(text);
            buildTable(text);
        });
    });


});