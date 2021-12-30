window.setInterval(function(){ 
    var date = new Date();

    // Получение списка задач
    const items = {...localStorage};
    
    for(let i = 2; i <= Object.keys(items).length; i++) {
        let task = 'task'+i;
        dataTasker = JSON.parse(items[task]);

        for(let i = 0; i < Object.keys(dataTasker).length; i++) {
            if(typeof(dataTasker[i]) === 'object') {
                if(dataTasker[i].status) {
                    if(dataTasker[i].date != 'null' && dataTasker[i].date != null) {
                        if(dataTasker[i].time != 'null' && dataTasker[i].time != null) {
                            let toDay = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
                            let toTime = date.getHours()+':'+date.getMinutes();
                            if(toDay == dataTasker[i].date && toTime == dataTasker[i].time) {
                                displayNotification('Напоминание по задаче', dataTasker[i].task);
                            }
                        } else {
                            let toDay = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
                            if(toDay == dataTasker[i].date) {
                                displayNotification('Напоминание по задаче', dataTasker[i].task);
                            }
                        }   
                    }
                }
            }
        }

    }
}, 30000);