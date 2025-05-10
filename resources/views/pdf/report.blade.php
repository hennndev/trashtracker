<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Temuan Sampah</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #333;
            padding: 8px 5px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0;
        }
        h2 {
            text-align: center;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
  <h2>Laporan Temuan Sampah</h2>  
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Pelapor</th>
                <th>Deskripsi</th>
                <th>Alamat</th>
                <th>Status</th>
                <th>Tanggal Lapor</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($data as $index => $data)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $data->user->name }}</td>
                    <td>{{ $data->description }}</td>
                    <td>{{ $data->full_address }}</td>
                    <td>{{ $data->status }}</td>
                    <td>{{ \Carbon\Carbon::parse($data->created_at)->format('d-m-Y H:i') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center;">Tidak ada data</td>
                </tr>
            @endforelse
        </