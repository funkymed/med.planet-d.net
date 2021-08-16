<?php
function getDirectoryList($directory)
{
    // create an array to hold directory list
    $results = array();
    // create a handler for the directory
    $handler = opendir($directory);
    // open directory and walk through the filenames
    while ($file = readdir($handler)) {
        // if file isn't this directory or its parent, add it to the results
        if ($file != "." && $file != ".." && $file != ".DS_Store") {
            $results[] = $directory.'/'.$file;
        }
    }
    // tidy up: close the handler
    closedir($handler);
    // done!
    return $results;
}


$years = getDirectoryList('public/tracks/xm');
sort($years);

$list = array();
foreach ($years as $year) {
    $data = getDirectoryList($year);
    sort($data);
    $list = array_merge($list, $data);
}

sort($list);

function humanFileSize($size, $unit="")
{
    if ((!$unit && $size >= 1<<30) || $unit == "GB") {
        return number_format($size/(1<<30), 2)."GB";
    }
    if ((!$unit && $size >= 1<<20) || $unit == "MB") {
        return number_format($size/(1<<20), 2)."MB";
    }
    if ((!$unit && $size >= 1<<10) || $unit == "KB") {
        return number_format($size)." bytes";
    }
    return number_format($size)." bytes";
}

$modules = [];
foreach ($list as $filename) {
    $size = filesize($filename);
    $modules[]=[
        'filename'=>str_replace('public/','',$filename),
        'size'=>humanFileSize($size),
    ];
}
echo "export const modules = ".json_encode($modules).";\n";
