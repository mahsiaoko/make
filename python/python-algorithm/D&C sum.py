def sum(arr):
    if len(arr)==0:
        return 0
    else:
        return arr[0]+sum(arr[1:len(arr)])

print(sum([0,1,2,3,4,5]))
