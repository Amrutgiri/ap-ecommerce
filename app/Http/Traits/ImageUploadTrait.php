<?php

namespace App\Http\Traits;

use Illuminate\Http\File;
use Illuminate\Support\Facades\App;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

trait ImageUploadTrait
{
    public static function imageUpload($file, $filePath)
    {
        $filenameWithExt = $file->getClientOriginalName();
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileNameToStore = md5($filename) . '-' . time() . '.' . $extension;
        $interventionImage = Image::make($file->path());


        // Modify the image using intervention
        $interventionImage = $interventionImage->resize(300, 300);

        $interventionImage->encode($extension);
        $interventionImage->save($fileNameToStore, 60);
        // Save the intervention image over the request image
        $saved_image_uri = $interventionImage->dirname . '/' . $interventionImage->basename;
        $file = new File($saved_image_uri);
        $path = Storage::putFileAs($filePath, $file, $fileNameToStore);
        if (isset($interventionImage)) {
            $interventionImage->destroy();
            unlink($saved_image_uri);
        }
        return $path;
    }

    public static function imageDelete($path)
    {
        Storage::delete($path);
        return true;
    }
}
